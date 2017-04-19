Examples using APIs
====================================================

A set of examples using Javascript, React, and some public APIs.


The tools
------------------------------

* A good old text editor. I like `vim <http://www.vim.org/>`_ and, for the more visually-inclined developers, `Atom <https://atom.io/>`_.
* `curl <https://curl.haxx.se/>`_: a command line tool and library for transferring data with URLs.
* `jq <https://stedolan.github.io/jq/>`_: a command-line JSON processor.
* `Postman <https://www.getpostman.com/>`_: a GUI for building and testing API requests.
* Modern Javascript, especially ECMAScript 2015 (also known as ES6) and concepts such as `classes <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes>`_ and `arrow functions <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>`_.
* `React <https://facebook.github.io/react/>`_: a javascript library for building user interfaces.
* `webpack 2 <https://webpack.js.org/>`_: a module bundler for modern JavaScript applications.
* `Babel <https://babeljs.io/>`_: a javascript compiler.
* `Node.js <https://nodejs.org/en/>`_ and `npm <https://www.npmjs.com/>`_.
* There's a little bit of `Docker <https://docs.docker.com/get-started/>`_ to run a development container.


The Cooper Hewitt Collection API
-----------------------------------

Go sign up for an account at `Cooper Hewitt, Smithsonian Design Museum Collections API <https://collection.cooperhewitt.org/api/>`_ and then `create a token <https://collection.cooperhewitt.org/api/oauth2/authenticate/like-magic/>`_ to use for your API calls.

Now you can make an API call with the `api.test.echo method <https://collection.cooperhewitt.org/api/methods/api.test.echo>`_. Here's an example from the command line via curl. Note that I've set an environment variable to avoid repeating the token and see how the last two commands pipe the output, first with Python and then with jq to show prettier JSON.

.. code-block:: bash

  $ export TOKEN=cdc1234b5ef27123b9131b54cb700b5a
  $ echo $TOKEN
  $ curl -X GET "https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token=$TOKEN"
  $ curl -X GET "https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token=$TOKEN" | python -m json.tool
  $ curl -X GET "https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token=$TOKEN" | jq '.'

If you prefer to use Postman, you can set environment global variables to do something similar. For example, you could create a variable named TOKEN and send a GET request to ``https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token={{TOKEN}}``.

This is the desired output:

.. code-block:: json

  {
    "method": "api.test.echo",
    "stat": "ok"
  }

This is a call to get a list of exhibitions.

.. code-block::

  https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getList&page=1&per_page=5&access_token={{TOKEN}}

This is one to get objects from a specific exhibition (exhibition_id=69117611). Note that I'm limiting the calls to five results from the first page.

.. code-block::

  https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&exhibition_id=69117611&page=1&per_page=5&access_token={{TOKEN}}

And this is how to get the images for an object (object_id=18383413).

.. code-block::

  https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getImages&object_id=18383413&access_token={{TOKEN}}


API calls from the Node.js REPL
-----------------------------------

This is using `Axios <https://github.com/mzabriskie/axios>`_ to make an API call.

.. code-block:: javascript

  const axios = require('axios');
  let token = 'cdc1234b5ef27123b9131b54cb700b5a';
  axios.get(`https://api.collection.cooperhewitt.org/rest/?method=api.test.echo&access_token=${token}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

Axios assumes the response is already JSON.

Additional references
------------------------------

* `More React tests with webpack and Docker <https://github.com/alexisbellido/node-tests>`_.


Initial setup
------------------------------

You are going to use Docker to make sure your environment is exactly the same as the one used here. I strongly suggest you read the `documentation <https://docs.docker.com/get-started/>`_ to have a better grasp.

There are two terms you need to know first:

* Host. This is your computer, the one where you always work and where you will run Docker. It's called host because from Docker's point of view, this is the computer that will host the containers.
* Container. These are the virtual computers running on the host thanks to Docker.

Start by building a Node.js Docker image with the provided Dockerfile, which is just adding a exposed port to the `official node image <https://hub.docker.com/_/node/>`_. My GitHub name matches my Docker Hub name so I could push this image to my `personal Docker Hub <https://hub.docker.com/u/alexisbellido/>`_.

.. code-block:: bash

  $ docker build -t alexisbellido/node:7.9.0 .

Create a network to use for your containers.

.. code-block:: bash

  $ docker network create -d bridge zinibu

When you create the node container, the current directory will be owned by the root user and your application needs to use the node user. The best way to solve this is making sure your host user (the computer where you are running Docker) has the same uid that the node user on the container, which should be 1000 and create a directory for your application with that user. I'm calling mine *app-1* and it lives in the root of this repository.

Then you can create your container.

.. code-block:: bash

  $ mkdir app-1
  $ docker run --network zinibu -it -d -p 8888:8888 --hostname app-1 --name app-1 -v "$PWD"/app-1:/usr/src/app -w /usr/src/app alexisbellido/node:7.9.0

And now you can ssh into the container's bash command line.

.. code-block:: bash

  $ docker exec -it app-1 /bin/bash

Remember, from now on, every time I say *login to your container* or *ssh into your container* this is the command you need to run.

Now you can globally install a simple http-server with npm on the container.

.. code-block:: bash

  $ npm install http-server -g

**Very important**: at this point you have a */usr/src/app* directory on the container and that directory maps to the *app-1* directory provided by this repository on the host. This makes it possible to edit the files from the host without accessing the container. This is how you usually `manage data in containers <https://docs.docker.com/engine/tutorials/dockervolumes/>`_.

Now start the http-server on port 8888, the one your container is exposing.

.. code-block:: bash

  $ cd /usr/src/app # just in case, you should already be here
  $ http-server -p 8888

And now if you put an index.html file in *usr/src/app* you can browse to http://localhost:8888/ and see it.

Did it work? Cool. Now you're ready for the real action.


First steps with React
---------------------------------------

The *app-1* directory contains a *package.json* file that includes everything you need to run a React application on your container, login to it, make sure you're in the /usr/src/app directory and install with npm.

.. code-block:: bash

  $ cd /usr/src/app
  $ npm install

It may take a while but at the end you will have all the pieces ready. Take a look at all the Node.js package you just installed.

.. code-block:: bash

    $ npm ls --depth=0

Note that the http-server server you installed earlier is not listed, and that's all right because you installed it globally.


Some helpful npm commands
---------------------------------------

If you are only interested in the packages installed globally without the full tree then:

.. code-block:: bash

    $ npm -g ls --depth=0

or locally:

.. code-block:: bash

    $ npm ls --depth=0
