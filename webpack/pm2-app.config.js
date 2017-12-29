const path = require('path');

module.exports = {
  apps: [
    {
      name: 'rg-labs',
      script: __dirname + '/bin/server.js',
      pid_file: path.resolve(__dirname, '../pids/rg-labs.pid'),
      out_file: path.resolve(__dirname, '../log/rg-labs-out.log'),
      error_file: path.resolve(__dirname, '../log/rg-labs-err.log'),
      merge_logs: true,
      combine_logs: true,
      env_development: {
        NODE_PATH: './src',
        NODE_ENV: 'production',
        ENV: 'development',
        PORT: '4000'
      },
      env_dev: {
        NODE_PATH: './src',
        NODE_ENV: 'production',
        ENV: 'dev',
        PORT: '4000'
      },
      env_staging: {
        NODE_PATH: './src',
        NODE_ENV: 'production',
        ENV: 'staging',
        PORT: '4000'
      },
      env_production: {
        NODE_PATH: './src',
        NODE_ENV: 'production',
        ENV: 'production',
        PORT: '4000'
      }
    }
  ]
}
