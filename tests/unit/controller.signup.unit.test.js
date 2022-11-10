const SignupController = require('../../controllers/signup');
const signupService = require('../../services/signup');

jest.mock('../../services/signup');

afterEach(() => jest.clearAllMocks());

const repos = {
  user: {
    create: jest.fn(),
  },
};
const req = {
  body: {
    email: 'user@test.com',
  },
};
const res = {
  sendStatus: jest.fn(),
};
const next = jest.fn();
const statusCode = 201;
const signupController = SignupController(repos);

test('it should call the sign up service', async () => {
  await signupController(req, res, next);

  expect(signupService).toHaveBeenCalledWith(
    req.body,
    repos.user.create,
  );
});

test('it should send an HTTP 201 Created', async () => {    
  await signupController(req, res, next);

  expect(res.sendStatus).toHaveBeenCalledWith(statusCode);
  expect(next).not.toHaveBeenCalled();
});

test('it should catch and forward an error', async () => {
  signupService.mockImplementation(() => {
    throw new Error('DUPLICATE');
  });

  await signupController(req, res, next);

  expect(res.sendStatus).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith(new Error('DUPLICATE'));
});
