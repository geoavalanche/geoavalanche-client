FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD . /usr/src/app

ENV NODE_PORT 4000
EXPOSE ${NODE_PORT}
CMD [ "npm", "run", "test" ]