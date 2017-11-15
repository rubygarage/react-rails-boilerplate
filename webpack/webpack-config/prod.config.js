// Webpack config for creating the production bundle.
const NODE_ENV = process.env.NODE_ENV || 'production'
const ENV = process.env.ENV || 'production'
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var HappyPack = require('happypack');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './src/static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'happypack/loader'
        ]
      },
      {
        test: /\global.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 2 } },
            "postcss-loader",
            { loader: "sass-loader", options: { outputStyle: 'expanded' } },
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /global/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { modules: true, importLoaders: 2, localIdentName: '[local]___[hash:base64:5]' } },
            "postcss-loader",
            { loader: "sass-loader", options: { outputStyle: 'expanded' } },
          ]
        })
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'application/font-woff' }
          }
        ]
      },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader'] },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        use: [ { loader: 'url-loader' } ]
      }
    ]
  },
  resolve: {
    alias: {
      images: path.join(__dirname, '../src/static/images'),
      fonts: path.join(__dirname, '../src/static/fonts')
    },
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new HappyPack({
      // loaders is the only required parameter:
      threads: 4,
      loaders: [ strip.loader('debug'), 'babel-loader' ],
    }),

    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        ENV: JSON.stringify(ENV)
      }
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin(),
    webpackIsomorphicToolsPlugin
  ]
};
