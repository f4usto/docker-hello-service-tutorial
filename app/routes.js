// Libraries
const express = require('express');

// Utils
const router = express.Router();

// Pages
router.use(require('./controllers/pages/PagesController'));

// API
router.use('/api', require('./controllers/api/CreateController'));
router.use('/api', require('./controllers/api/ReadController'));

module.exports = router;
