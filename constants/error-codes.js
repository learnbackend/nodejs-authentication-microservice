module.exports = {
  INVALID_EMAIL_OR_PASSWORD: {
    statusCode: 400, // Bad Request
    message: 'Invalid email address or password',
  },
  INCORRECT_PASSWORD: {
    statusCode: 401, // Unauthorized
    message: 'Invalid password',
  },
  USER_NOT_FOUND: {
    statusCode: 404, // Not Found
    message: 'User not found',
  },
  ER_DUP_ENTRY: {
    statusCode: 409, // Conflict
    message: 'Email address already exists',
  },
  INTERNAL_ERROR: {
    statusCode: 500, // Internal Server Error
    message: 'Internal Server Error',
  },
};
