const schemas = require('../schemas');
const CustomError = require('../utils/custom-error');

module.exports = (schemaName) => (req, res, next) => {
  const schema = schemas[schemaName] || null;

  if (schema) {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new CustomError('INVALID_EMAIL_OR_PASSWORD');
    } else {
      next();
    }
  } else {
    throw new CustomError('INTERNAL_ERROR');
  }
};
