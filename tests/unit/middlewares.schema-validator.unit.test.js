const schemas = require('../../schemas');
const schemaValidator = require('../../middlewares/schema-validator');
const CustomError = require('../../utils/custom-error');

jest.mock('../../schemas', () => ({
  login: {
    validate: jest.fn(),
  },
  signup: {
    validate: jest.fn(),
  },
}));

const schema = {
  validate: jest.fn()
};
const req = {
  body: {
    email: 'test@mail.com',
    password: 'helloworld'
  }
};
const res = null;
const next = jest.fn();

afterEach(() => jest.clearAllMocks());

test('it should call the next function when the validate method returns an undefined error', () => {
  const error = undefined;
  
  schemas.login.validate.mockImplementation(() => ({ error }));
  schemaValidator('login')(req, res, next);

  expect(next).toHaveBeenCalled();
});

test('it should throw a CustomError when the validate method returns an error', () => {
  schemas.login.validate.mockImplementation(() => ({ error: new Error() }));
  try {
    schemaValidator('login')(req, res, next);
  } catch(error) {
    expect(error).toEqual(new CustomError);
    expect(error.code).toBe('INVALID_EMAIL_OR_PASSWORD');
  }
});

test('it should throw a CustomError when the schema is undefined', () => {
  try {
    schemaValidator('foobar')(req, res, next);
  } catch(error) {
    expect(error).toEqual(new CustomError);
    expect(error.code).toBe('INTERNAL_ERROR');
  }
});
