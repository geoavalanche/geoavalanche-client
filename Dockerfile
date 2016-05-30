FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD . /usr/src/app

# Set DOCKER_HOST ip address
# ENV DOCKER_HOST_IP ${DOCKER_HOST_IP}
# ENV DOCKER_HOST_IP {{DOCKER_HOST_IP}}
# RUN echo ${DOCKER_HOST_IP}
# ARG DOCKER_HOST
RUN export DOCKER_HOST_IP=$(echo ${DOCKER_HOST} | sed 's/tcp:\/\/\([^:]*\).*/\1/')
ENV DOCKER_HOST_IP ${DOCKER_HOST_IP}
RUN echo ${DOCKER_HOST_IP}
# ENV DOCKER_HOST {{DOCKER_HOST}}

# Set default port for testing environment
ENV NODE_PORT 3001
EXPOSE ${NODE_PORT}

CMD [ "npm", "run", "test" ]