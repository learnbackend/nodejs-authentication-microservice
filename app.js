const Env = require('./loaders/environment');
const Database = require('./loaders/database');
const Server = require('./loaders/server');
const Models = require('./models');
const Repositories = require('./repositories');

(async () => {
  try {
    const env = Env();
    const db = await Database(env);
    const models = await Models(db, env);
    const repos = Repositories(models);
    const server = Server(env, repos);

    server.listen(env.server.port, () => {
      console.log(`Server running on port ${env.server.port}`);
    });

    process.on('SIGINT', async () => {
      try {
        await db.close();
        process.exit(0);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
