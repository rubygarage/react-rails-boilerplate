import openPopup from 'utils/popup';

const popup = jest.fn();
const windowSettings = 'location=no,scrollbars=no,toolbar=no,status=no,titlebar=no,directories=no,menubar=no';
const facebookWindowDimensions = 'width=580,height=400,top=312,left=350';
const otherWindowDimensions = 'width=1020,height=618,top=203,left=130';

Object.defineProperty(window, 'open', { value: popup });

Object.defineProperty(window, 'screenLeft', { value: 0 });

Object.defineProperty(window, 'screenTop', { value: 0 });

Object.defineProperty(window, 'innerWidth', { value: 1280 });

Object.defineProperty(window, 'innerHeight', { value: 1024 });

describe('openPopup()', () => {
  const spyWindowOpen = jest.spyOn(window, 'open');
  const spyAddEventListener = jest.spyOn(window, 'addEventListener');

  afterEach(() => {
    spyWindowOpen.mockReset();
    spyAddEventListener.mockReset();
  });

  it('opens popup', () => {
    openPopup('test/url', 'facebook');

    expect(spyWindowOpen).toHaveBeenCalled();
  });

  it('opens popup with facebook aruments', () => {
    const testUrl = 'http://rg_react_url_for_test';
    openPopup(testUrl, 'facebook');

    expect(popup.mock.calls[0][0]).toEqual(testUrl);
    expect(popup.mock.calls[0][1]).toEqual('Authentication');
    expect(popup.mock.calls[0][2]).toEqual(`${windowSettings},${facebookWindowDimensions}`);
  });

  it('opens popup with other provider aruments', () => {
    const testUrl = 'https://other/url';
    openPopup(testUrl, 'facke_provider');

    expect(popup.mock.calls[0][0]).toEqual(testUrl);
    expect(popup.mock.calls[0][1]).toEqual('Authentication');
    expect(popup.mock.calls[0][2]).toEqual(`${windowSettings},${otherWindowDimensions}`);
  });

  it('calls addEventListener', () => {
    openPopup('test/url', 'facebook');

    expect(spyAddEventListener).toHaveBeenCalled();
  });
});
