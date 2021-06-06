module.exports = {
  apps : [
    {
      name: "hearts-backend",
      script: "server.js",
      cwd: 'server/',
      env: {
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false
    },
    {
      name: "hearts-client",
      script: "serve",
      cwd: "client/",
      env: {
        PM2_SERVE_PATH: 'build/',
        PM2_SERVE_PORT: 5001,
        PM2_SERVE_SPA: 'true'
      },
      instances: 1,
      autorestart: true,
      watch: false
    },
  ]
}