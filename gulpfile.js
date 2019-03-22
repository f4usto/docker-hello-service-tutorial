const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const cleanCSS = require('gulp-clean-css');
const notifier = require('node-notifier');
const vueify = require("vueify");
const uglify = require('gulp-uglify-es').default;
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/* Compile and transpile scripts */
gulp.task('scripts', () => {

    browserify("src/assets/js/app.js")
        .transform("babelify", { presets: ["@babel/preset-env", "@babel/preset-react"] })
        .transform(vueify)
        .bundle()
        .on("error", (error) => console.log(error))
        .on("init", () => console.log('start'))
        .on("end", () => {
            notifier.notify({
                'title': 'Sucesso!',
                'message': 'Compilação finalizada'
            });
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});

/* Compile and minify styles */
gulp.task('sass', () => {

    return gulp.src('src/assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'));

});

/* Gulp tasks */
gulp.task('default', ['sass', 'scripts'], function () {
    gulp.watch("src/assets/scss/**/*.*", ['sass']);
    gulp.watch("src/assets/js/**/*.*", ['scripts']);
});
