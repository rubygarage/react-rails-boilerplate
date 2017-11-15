#!/usr/bin/env node
require('../server.babel') // babel registration (runtime transpilation for node)
const path = require('path')
const rootDir = path.resolve(__dirname, '..')

/**
 * Define isomorphic constants.
 */

/* eslint-disable */
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
/* eslint-enable */

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-config/webpack-isomorphic-tools'))
  .server(rootDir, () => {
    require('../src/server')
  })
