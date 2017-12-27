module.exports = {
  apps: [
    {
      name: 'rg-react-redux-isomorphic-example',
      script: 'bin/server.js',
      pid_file: '../tmp/pids/rg-react-redux-isomorphic-example-node.pid',
      out_file: '../log/rg-react-redux-isomorphic-example-node-out.log',
      error_file: '../log/rg-react-redux-isomorphic-example-node-err.log',
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
