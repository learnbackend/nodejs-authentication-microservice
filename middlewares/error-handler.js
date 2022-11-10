const errorCodes = require('../constants/error-codes');

module.exports = (err, req, res, next) => {
  const code = (err && err.code)
    || (err.original && err.original.code)
    || null;

  const error = errorCodes[code] || errorCodes['INTERNAL_ERROR'];

  return res.status(error.statusCode).json({ message: error.message });
};
