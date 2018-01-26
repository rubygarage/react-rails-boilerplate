import GoogleAnalytics from 'utils/googleAnalytics';
import config from 'utils/config';

const TEST_PATHNAME = '/some/test/path';
const TEST_SEARCH = '?param=arg';

const mockSetReactGA = jest.fn();
const mockPageviewReactGA = jest.fn();
const mockInitializeReactGA = jest.fn();

Object.defineProperty(window.location, 'search', {
  value: TEST_SEARCH,
});

Object.defineProperty(window.location, 'pathname', {
  value: TEST_PATHNAME,
});

jest.mock('react-ga', () => ({
  set: window => mockSetReactGA(window),
  pageview: window => mockPageviewReactGA(window),
  initialize: configFile => mockInitializeReactGA(configFile),
}));

describe('GoogleAnalytics()', () => {
  beforeAll(() => {
    const ga = new GoogleAnalytics();
    ga.triggerPageView();
  });

  it('calls initialize with params', () => {
    expect(mockInitializeReactGA).toBeCalled();
    expect(mockInitializeReactGA.mock.calls[0][0])
      .toEqual(config.googleAnalyticsUID);
  });

  it('sets page', () => {
    expect(mockSetReactGA).toBeCalled();
    expect(mockSetReactGA.mock.calls[0][0])
      .toEqual({ page: TEST_PATHNAME + TEST_SEARCH });
  });

  it('sets pageview', () => {
    expect(mockPageviewReactGA).toBeCalled();
    expect(mockPageviewReactGA.mock.calls[0][0])
      .toEqual(TEST_PATHNAME + TEST_SEARCH);
  });
});
