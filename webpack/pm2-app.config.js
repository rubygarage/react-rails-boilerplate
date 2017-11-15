module.exports = {
  apps: [
    {
      name: 'pindify-node-client',
      script: 'bin/server.js',
      pid_file: '../tmp/pids/pindify-node.pid',
      out_file: '../log/pindify-node-out.log',
      error_file: '../log/pindify-node-err.log',
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
