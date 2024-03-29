import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import IntlProviderRedux from 'containers/IntlProviderRedux'
import memoizedBrowserHistory from 'helpers/memoizedBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import routes from 'routes'
import styles from 'assets/styles/global.css' // eslint-disable-line

export default class Root extends Component {
  render() {
    const { store, type, req } = this.props
    let history = {}
    type === 'server' ? history = createMemoryHistory() : history = new memoizedBrowserHistory()

    if (req) { history.push(req.url) }

    return (
      <Provider store={store}>
        <IntlProviderRedux>
          <Router history={history} >
            {renderRoutes(routes)}
          </Router>
        </IntlProviderRedux>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  // routes: PropTypes.node.isRequired,
  type: PropTypes.string,
  // renderProps: PropTypes.object,
  req: PropTypes.object
}
