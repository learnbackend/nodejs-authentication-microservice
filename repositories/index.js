const UserRepository = require('./user');

module.exports = (models) => ({
  user: UserRepository(models.user),
});
