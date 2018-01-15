import ApiClient from 'utils/apiClient'

const mockCookieGet = jest.fn(() => ({ authentication: 'authToken' }));
jest.mock('universal-cookie', () => (
  function () {
    return {
      get: mockCookieGet,
    };
  }
));

const mockIsServer = jest.fn();
jest.mock('helpers/server', () => ({ isServer: () => mockIsServer() }));

describe('ApiClient#buildClient()', () => {
  it('creates api client with headers from client cookie', () => {
    const client = new ApiClient().buildClient();
  });
});
