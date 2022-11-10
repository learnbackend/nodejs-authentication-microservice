const express = require('express');
const healthController = require('../controllers/health');
const fallbackController = require('../controllers/fallback');
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
const schemaValidatorMiddleware = require('../middlewares/schema-validator');
const errorHandlerMiddleware = require('../middlewares/error-handler');

module.exports = (env, repos) => {
  const app = express();

  app.use('/auth', express.urlencoded());

  app.get('/health', healthController);

  app.post(
    '/auth/login',
    schemaValidatorMiddleware('login'),
    loginController(env, repos),
  );

  app.post(
    '/auth/signup',
    schemaValidatorMiddleware('signup'),
    signupController(repos),
  );

  app.all('*', fallbackController);

  app.use(errorHandlerMiddleware);

  return app;
};
