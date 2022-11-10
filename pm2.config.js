module.exports = {
  apps : [
    {
      name   : "authentication",
      script : "./app.js",
      env_production: {
        NODE_ENV: 'production'
      },
      watch: true,
      ignore_watch: ['node_modules'],
      restart_delay: 3000,
      max_restarts: 3
    }
  ]
}
