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
ARG DOCKER_HOST=${DOCKER_HOST}
# RUN echo -n DOCKER_HOST=$DOCKER_HOST
ENV DOCKER_HOST ${DOCKER_HOST}
# RUN echo -n DOCKER_HOST=$DOCKER_HOST
# ARG DOCKER_HOST_IP=${DOCKER_HOST_IP}
ENV DOCKER_HOST_IP ${DOCKER_HOST_IP}

# RUN export DOCKER_HOST_IP=$(echo ${DOCKER_HOST} | sed 's/tcp:\/\/\([^:]*\).*/\1/') sempre vuoto
# RUN echo -n $(echo ${DOCKER_HOST} | sed 's/tcp:\/\/\([^:]*\).*/\1/') >> /root/.bashrc
# RUN touch .envset && echo "[docker]" >> .envset
# RUN echo -n DOCKER_HOST_IP=$(echo ${DOCKER_HOST} | sed 's/tcp:\/\/\([^:]*\).*/\1/') >> .envset
# RUN echo -n DOCKER_HOST_IP=$(echo ${DOCKER_HOST} | sed 's/tcp:\/\/\([^:]*\).*/\1/') >> /root/.bashrc # doesn't execute the substitution at the build time
RUN echo export DOCKER_HOST_IP=${DOCKER_HOST} | sed 's/tcp:\/\/\([^:]*\).*/\1/' >> /root/.bashrc

########################################## Attempt with fixed DOCKER_HOST #################################################
# RUN echo DOCKER_HOST_IP=tcp://192.168.99.101:2376 | sed 's/tcp:\/\/\([^:]*\).*/\1/' >> /root/.bashrc # variable has been written to bash profile 

# Set default port for testing environment
ENV NODE_PORT 3001
EXPOSE ${NODE_PORT}

CMD [ "npm", "run", "test" ] 