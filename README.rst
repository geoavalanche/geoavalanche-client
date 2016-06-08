*******************
GeoAvalanche Client
*******************

Development
===========

How to run locally
------------------

Install required dependencies:

.. code-block:: console

    npm install browserify && npm install -g http-server

Run the server with:

.. code-block:: console

    npm run local

How to test with Docker
-----------------------

Docker
^^^^^^

Install the `Docker Toolbox`_ 

.. _Docker Toolbox: https://www.docker.com/products/docker-toolbox

Set the shell environment:

.. code-block:: console

    eval $(docker-machine env default)

Start the docker machine:

.. code-block:: console

    docker-machine start default

Build the container image for data volume from the directory *data*:

.. code-block:: console

    docker build -t geoavalanche/geoavalanche-data .

Build the container image from where you have placed the dockerfile

.. code-block:: console

	docker build -t geoavalanche/geoavalanche-client .

If you want to pass the docker host variable to the container then the command is
 
.. code-block:: console
 
    docker build --build-arg DOCKER_HOST=$(docker-machine url) -t geoavalanche/geoavalanche-client .
    docker build --build-arg DOCKER_HOST=${DOCKER_HOST} -t geoavalanche/geoavalanche-client .
    
 Otherwise build that without arguments:

 .. code-block:: console
 
 	docker build -t geoavalanche/geoavalanche-client .    

Run the container with the built image:

.. code-block:: console

	docker run -p 3001:3001 -d geoavalanche/geoavalanche-client

Docker Compose
^^^^^^^^^^^^^^

If you want to pass the docker host variable to the orchestration of the GeoAvalanche containers then use this command:

.. code-block:: console

    DOCKER_HOST_IP=$(docker-machine ip) docker-compose up

Otherwise run simply:

.. code-block:: console

   docker-compose up 
