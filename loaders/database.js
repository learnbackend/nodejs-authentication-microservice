const Sequelize = require('sequelize');

module.exports = async (env) => {
  const {
    name,
    user,
    password,
    host,
    port,
    dialect,
    logging,
  } = env.database;

  const db = new Sequelize(name, user, password, {
    host,
    port,
    dialect,
    logging,
  });

  await db.authenticate();

  return db;
};
