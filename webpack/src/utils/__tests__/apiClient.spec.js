import ApiClient from 'utils/apiClient';
import config from 'utils/config';

jest.mock('universal-cookie', () => (
  (params = 'ClientAuthToken') => ({
    get: () => (params),
  })
));

const mockIsServer = jest.fn();
jest.mock('helpers/server', () => ({ isServer: () => mockIsServer() }));

const req = {
  headers: {
    cookie: 'RequestAuthToken',
  },
};

describe('ApiClient#buildClient()', () => {
  it('creates api client with headers from client cookie when passed no params', () => {
    const client = new ApiClient().buildClient();
    expect(client.defaults.headers.authorization).toBe('ClientAuthToken');
  });

  it('creates api client with headers from request when it passed to params', () => {
    const client = new ApiClient().buildClient(req);
    expect(client.defaults.headers.authorization).toBe('RequestAuthToken');
  });

  it('sets baseURL if run on server', () => {
    mockIsServer.mockReturnValueOnce(true);
    const client = new ApiClient().buildClient(req);
    expect(client.defaults.baseURL).toBe(config.apiBaseUrl);
  });
});
