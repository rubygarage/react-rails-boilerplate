import createHistory from 'history/createBrowserHistory';

let instance = null;

export default class memoizedBrowserHistory {
  constructor() {
    if (!instance) {
      instance = createHistory();
    }

    return instance;
  }
}
