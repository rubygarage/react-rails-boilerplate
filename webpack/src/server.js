import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import favicon from 'serve-favicon'
import compression from 'compression'
import path from 'path'
import http from 'http'
import config from 'utils/config'
import configureStore from './store/configureStore'
import Html from './helpers/Html'
import Root from './containers/Root/Root'
import { matchRoutes } from 'react-router-config'
import { waitAll } from './sagas'
import { authorizeUser } from 'helpers/authorization'
import routes from 'routes'
import devProxy from 'proxy'

const app = new Express()
const server = new http.Server(app)

const proxiedApp = devProxy(app)

proxiedApp.use(compression())
proxiedApp.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
proxiedApp.use(Express.static(path.join(__dirname, 'static')))

proxiedApp.use((req, res) => {
  if (__DEVELOPMENT__) { webpackIsomorphicTools.refresh() } // eslint-disable-line

  new Promise((resolve, reject) => { authorizeUser(req, resolve, reject) }).then((result) => {
    const store = configureStore({ signin: { currentUser: result.currentUser }, entities: result.entities })
    const assets = webpackIsomorphicTools.assets() // eslint-disable-line

    const prefetchingRequests = matchRoutes(routes, req.path).map(({ route, match }) => (
      route.component.preload ? route.component.preload(match.params, req, res) : []
    ))
    const sagasToRun = [].concat([], ...prefetchingRequests)

    store.runSaga(waitAll(sagasToRun)).done.then(() => {
      global.navigator = { userAgent: req.headers['user-agent'] }

      const rootComponent = (<Root store={store} req={req} type="server" />)
      const htmlComponent = <Html assets={assets} component={rootComponent} store={store} />
      const renderedDomString = ReactDOMServer.renderToString(htmlComponent)

      res.status(200).send(`<!doctype html>\n ${renderedDomString}`)
    })
  })
})

server.listen(config.port || 4000, (err) => {
  if (err) { console.error(err) }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
})
