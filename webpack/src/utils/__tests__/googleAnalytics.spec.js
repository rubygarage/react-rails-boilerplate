import GoogleAnalytics from 'utils/googleAnalytics';

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
    expect(mockInitializeReactGA).toBeCalled();
  });

  it('sets page', () => {
    expect(mockSetReactGA).toBeCalled();
  });

  it('sets pageview', () => {
    expect(mockPageviewReactGA).toBeCalled();
  });
});
