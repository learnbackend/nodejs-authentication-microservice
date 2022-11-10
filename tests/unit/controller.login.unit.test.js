const LoginController = require('../../controllers/login');
const loginService = require('../../services/login');
const CustomError = require('../../utils/custom-error');

jest.mock('../../services/login');

afterEach(() => jest.clearAllMocks());

const env = {
  jwt: {
    secret: 'hello'
  }
};
const repos = {
  user: {
    read: jest.fn()
  }
};
const req = {
  body: {
    email: 'user@test.com'
  }
};
const res = {
  json: jest.fn()
};
const next = jest.fn();
const token = 'tkn';
const loginController = LoginController(env, repos);

test('it should call the log-in service', async () => {
  await loginController(req, res, next);

  expect(loginService).toHaveBeenCalledWith(
    req.body,
    env.jwt.secret,
    repos.user.read
  );
});

test('it should send a token', async () => {
  loginService.mockReturnValue(token);
    
  await loginController(req, res, next);

  expect(res.json).toHaveBeenCalledWith({ token });
  expect(next).not.toHaveBeenCalled();
});

test('it should catch and forward an error', async () => {
  loginService.mockImplementation(() => {
    throw new CustomError('USER_NOT_FOUND');
  });

  await loginController(req, res, next);

  expect(res.json).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith(
    new CustomError('USER_NOT_FOUND')
  );
});
