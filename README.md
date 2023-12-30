
# Realtime Chat Application

This is a realtime chat application built with NestJS and TypeScript.

## Installation

Run `npm install` to install all dependencies.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Use `npm run start` to start the application.

## Testing

Run `npm run test` to execute the unit tests via Jest.

## Modules

The application is divided into two modules:

- AppModule: This is the root module of the application.
- ChatModule: This module handles all chat-related functionalities.
- UserModule: This module handles all user-related functionalities.

## Controllers

The application has two controllers:

- AppController: This controller handles HTTP requests at the root route.
- ChatController: This controller handles HTTP requests related to chat.
- UserController: This controller handles HTTP requests related to user.

## Services

The application has two services:

- AppService: This service contains application-wide business logic.
- ChatService: This service contains chat-related business logic.
- UserService: This service contains user-related business logic.

## Authentication
 
The application uses the JWT authentication method,


## License

This project is licensed under the MIT License.
```
