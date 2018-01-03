import url from 'url'
import proxy from 'express-http-proxy'
import config from 'utils/config'

const devProxy = (app) => {
  const isMultipartRequest = function(req) {
    const contentTypeHeader = req.headers['content-type']

    return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1
  }

  // proxies api calls to the rails server and takes care of multipart requests. Needed for local development only
  const proxyMiddleware = function() {
    return function(req, res, next) {
      let reqAsBuffer = false
      let reqBodyEncoding = true
      let parseBodyReq = true
      if (isMultipartRequest(req)) {
        reqAsBuffer = true
        reqBodyEncoding = null
        parseBodyReq = false
      }

      return proxy(config.apiBaseUrl, {
        reqAsBuffer,
        reqBodyEncoding,
        parseBodyReq,
        limit: '100mb',
        forwardPath: (req) => `/api${url.parse(req.url).path}`
      })(req, res, next)
    }
  }

  app.use('/api', proxyMiddleware())
  app.use('/assets', proxy(config.apiBaseUrl, { forwardPath: (req) => `/assets/${url.parse(req.url).path}` }))
  app.use('/uploads', proxy(config.apiBaseUrl, { forwardPath: (req) => `/uploads/${url.parse(req.url).path}` }))
  app.use('/omniauth', proxy(config.apiBaseUrl, { forwardPath: (req) => `/omniauth/${url.parse(req.url).path}` }))

  return app
}

export default devProxy
