const signup = require('../services/signup');

module.exports = (repos) => async (req, res, next) => {
  try {
    await signup(req.body, repos.user.create);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
