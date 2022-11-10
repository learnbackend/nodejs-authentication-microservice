const Sequelize = require('sequelize');

module.exports = async (db, env) => {
  const UserModel = db.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  await UserModel.sync({ force: env.database.sync });

  return UserModel;
};
