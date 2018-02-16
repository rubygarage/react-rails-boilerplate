module.exports = {
  apps: [
    {
      name: 'boilerplate-node-client',
      script: 'bin/server.js',
      pid_file: '../tmp/pids/boilerplate-node.pid',
      out_file: '../log/boilerplate-node-out.log',
      error_file: '../log/boilerplate-node-err.log',
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
