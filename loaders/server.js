const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const document = YAML.load('./openapi.yaml');

const healthController = require('../controllers/health');
const fallbackController = require('../controllers/fallback');
const loginController = require('../controllers/login');
const signupController = require('../controllers/signup');
const schemaValidatorMiddleware = require('../middlewares/schema-validator');
const errorHandlerMiddleware = require('../middlewares/error-handler');

module.exports = (env, repos) => {
  const app = express();

  app.use('/auth', express.urlencoded());

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(document));

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
