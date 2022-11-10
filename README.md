# Node.js Authentication Microservice

The code from the book Build Layered Microservices available at https://learnbackend.dev/books/build-layered-microservices.

## Prerequisites

Make sure you have the following softwares installed on your system:

- Node.js
- NPM
- Git
- Docker

## Installation

Clone the Git repository

```
$ git clone git@github.com:learnbackend/nodejs-authentication-microservice.git
```

Enter the cloned directory.

```
$ cd nodejs-authentication-microservice
```

Install the dependencies

```
$ npm install
```

## Configuration

Create a `config` directory in the top-level directory of the project that will hold the configuration files for the various deployment environments.

```
$ mkdir config
```

Create the configuration files for _development_ and _production_.

```
$ touch config/.env.development
$ touch config/.env.production
```

Define the following environment variables in both files.

```
# The Express server port (ex: 3000)
SERVER_PORT=<number>

# The secret string used to sign JSON web tokens (ex: "HelloWorld")
JWT_SECRET=<string>

# The database name (ex: "authentication")
DATABASE_NAME=<string>

# The database user (ex: "admin")
DATABASE_USER=<string>

# The database password (ex: "admin")
DATABASE_PASSWORD=<string>

# The database host (ex: "localhost")
DATABASE_HOST=<string>

# The database port (ex: 3306 for MySQL)
DATABASE_PORT=<number>

# The database type (ex: "mysql" for MySQL)
DATABASE_DIALECT=<string>

# Display database logs (ex: TRUE)
DATABASE_LOGGING=<boolean>

# Synchronize the models with the database (ex: FALSE)
DATABASE_SYNC=<boolean>
```

## Database

Launch a MySQL database container using Docker.

```
$ docker run -d -p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=authentication \
-e MYSQL_USER=admin \
-e MYSQL_PASSWORD=admin \
mysql:8
```

Don't forget to update the value of `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD` and `DATABASE_PORT` in the configuration files.

## Usage

### Development mode

In _development_ mode, the project uses Nodemon to watch for file changes and automatically restart the server.

Note that Nodemon is part of the development dependencies and doesn't need to be manually installed.

To launch the server, run:

```
$ npm run dev
```

### Production mode

In _production_ mode, the project uses PM2 to manage the server.

PM2 can be installed globally using NPM:

```
$ npm install pm2 -g
```

To launch the server, run:

```
$ npm run prod
```

## Tests

Unit tests are located in the `tests/unit` directory.

Before running the tests, make sure to create a `config/.env.test` file containing the following values:

```
SERVER_PORT=3000
JWT_SECRET=secret
DATABASE_NAME=foo
DATABASE_USER=bar
DATABASE_PASSWORD=baz
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_DIALECT=mysql
DATABASE_LOGGING=TRUE
DATABASE_SYNC=TRUE
```

To run the test suite, run:

```
$ npm run test
```

## API Reference

You can access the API document at: `http://127.0.0.1:$SERVER_PORT/docs`

## Authors

- Razvan Ludosanu

## Licence

MIT
