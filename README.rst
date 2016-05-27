*******************
GeoAvalanche Server
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

Build the container image from where you have placed the dockerfile

.. code-block:: console

	docker build -t geoavalanche/geoavalanche-client .

Run the container with the built image:

.. code-block:: console

	docker run -p 3000:3000 -d geoavalanche/geoavalanche-client
