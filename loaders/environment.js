const { config } = require('dotenv');

module.exports = () => {
  const env = config({
    path: `./config/.env.${process.env.NODE_ENV || 'development'}`,
  });

  if (env.error) {
    throw env.error;
  }

  return {
    server: {
      port: parseInt(env.parsed.SERVER_PORT, 10),
    },
    jwt: {
      secret: env.parsed.JWT_SECRET,
    },
    database: {
      name: env.parsed.DATABASE_NAME,
      user: env.parsed.DATABASE_USER,
      password: env.parsed.DATABASE_PASSWORD,
      host: env.parsed.DATABASE_HOST,
      port: parseInt(env.parsed.DATABASE_PORT, 10),
      dialect: env.parsed.DATABASE_DIALECT,
      logging: env.parsed.DATABASE_LOGGING === 'TRUE',
      sync: env.parsed.DATABASE_SYNC === 'TRUE',
    },
  };
};
