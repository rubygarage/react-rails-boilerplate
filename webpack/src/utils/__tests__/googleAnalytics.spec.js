import GoogleAnalytics from 'utils/googleAnalytics';

const TEST_PATHNAME = '/some/test/path';
const TEST_SERACH = '?param=arg';

Object.defineProperty(window.location, 'pathname', {
  value: TEST_PATHNAME,
});
Object.defineProperty(window.location, 'search', {
  value: TEST_SERACH,
});

const mockSetReactGA = jest.fn();
const mockPageviewReactGA = jest.fn();
const mockInitializeReactGA = jest.fn();

jest.mock('react-ga', () => ({
  set: () => mockSetReactGA(),
  pageview: () => mockPageviewReactGA(),
  initialize: () => mockInitializeReactGA(),
}));

describe('GoogleAnalytics()', () => {
  beforeAll(() => {
    const ga = new GoogleAnalytics();
    ga.triggerPageView();
  });

  it('calls initialize', () => {
    expect(mockInitializeReactGA.mock.calls.length).toBe(1);
  });

  it('sets page', () => {
    expect(mockSetReactGA.mock.calls.length).toBe(1);
  });

  it('sets pageview', () => {
    expect(mockPageviewReactGA.mock.calls.length).toBe(1);
  });
});
