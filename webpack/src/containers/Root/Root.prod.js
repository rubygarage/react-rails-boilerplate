import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import IntlProviderRedux from 'containers/IntlProviderRedux';
import MemoizedBrowserHistory from 'helpers/memoizedBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import routes from 'routes';
import styles from 'assets/styles/global.css' // eslint-disable-line
import GoogleAnalytics from 'utils/googleAnalytics';

export default class Root extends React.PureComponent {
  render() {
    const { store, type, req } = this.props;
    let history = {};
    type === 'server' ? history = createMemoryHistory() : history = new MemoizedBrowserHistory();

    const googleAnalytics = new GoogleAnalytics();
    history.listen(() => {
      googleAnalytics.triggerPageView();
    });

    if (req) { history.push(req.url); }

    return (
      <Provider store={store}>
        <IntlProviderRedux>
          <Router history={history} >
            {renderRoutes(routes)}
          </Router>
        </IntlProviderRedux>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape({}),
  type: PropTypes.string,
  req: PropTypes.shape({}),
};
