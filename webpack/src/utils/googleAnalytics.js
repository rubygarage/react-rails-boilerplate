import ReactGA from 'react-ga';
import config from 'utils/config';

export default class GoogleAnalytics {
  // react-ga is a singleton, so initialize is only need to be called once.
  // consequent calls won't do anything
  constructor() {
    ReactGA.initialize(config.googleAnalyticsUID);
  }

  static triggerPageView() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
