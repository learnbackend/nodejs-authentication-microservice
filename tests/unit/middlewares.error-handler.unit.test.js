const errorHandler = require('../../middlewares/error-handler');
const errorCodes = require('../../constants/error-codes');
const CustomError = require('../../utils/custom-error');

afterEach(() => jest.clearAllMocks());

const req = null;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};
const next = null;

test('it should send an HTTP 400 caused by a custom error', () => {
  const code = 'INVALID_EMAIL_OR_PASSWORD';
  const err = new CustomError(code);
  const expected = errorCodes[code];

  errorHandler(err, req, res, next);
  
  expect(res.status).toHaveBeenCalledWith(expected.statusCode);
  expect(res.json).toHaveBeenCalledWith({
    message: expected.message
  });
});

test('it should send an HTTP 409 caused by a database error', () => {
  const code = 'ER_DUP_ENTRY';
  let err = new Error();
  err.original = { code };
  const expected = errorCodes[code];

  errorHandler(err, req, res, next);
  
  expect(res.status).toHaveBeenCalledWith(expected.statusCode);
  expect(res.json).toHaveBeenCalledWith({
    message: expected.message
  });
});

test('it should send an HTTP 500 caused by an unknown error', () => {
  const code = 'INTERNAL_ERROR';
  const err = new Error();
  const expected = errorCodes[code];

  errorHandler(err, req, res, next);
  
  expect(res.status).toHaveBeenCalledWith(expected.statusCode);
  expect(res.json).toHaveBeenCalledWith({
    message: expected.message
  });
});
