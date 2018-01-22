import ReactGA from 'react-ga';
import config from 'utils/config';

export default class GoogleAnalytics {
  // react-ga is a singleton, so initialize is only need to be called once.
  // consequent calls won't do anything
  constructor() {
    console.log('__GoogleAnalytics constructor triggered__!');
    ReactGA.initialize(config.googleAnalyticsUID);
  }

  triggerPageView = () => {
    console.log('triggerPageView was triggered _____________________!');
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
