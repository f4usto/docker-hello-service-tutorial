FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . /usr/src/app
COPY run-app.sh /usr/local/bin/run-app
COPY install-dependencies.sh /usr/local/bin/install-dependencies

# If you are building your code for production
RUN chmod +x /usr/local/bin/run-app \
    && chmod +x /usr/local/bin/install-dependencies

RUN /usr/local/bin/install-dependencies

CMD ["/usr/local/bin/run-app"]
