import { setTokenToStorage, deleteTokenFromStorage } from 'utils/tokens';

const headers = {
  authorization: 'auth-token',
};

const mockCookieSet = jest.fn();
const mockCookieRemove = jest.fn();
jest.mock('universal-cookie', () => (
  () => ({
    set: mockCookieSet,
    remove: mockCookieRemove,
  })
));

const mockIsClient = jest.fn();
jest.mock('helpers/server', () => ({ isClient: () => mockIsClient() }));

describe('setTokenToStorage()', () => {
  it('calls set on cookie if run on client', () => {
    mockIsClient.mockReturnValueOnce(true);
    setTokenToStorage(headers);
    expect(mockCookieSet.mock.calls.length).toBe(1);
  });

  it('doesnt calls set on cookie if run on server', () => {
    mockIsClient.mockReturnValueOnce(false);
    setTokenToStorage(headers);
    expect(mockCookieSet.mock.calls.length).toBe(1);
  });
});

describe('deleteTokenFromStorage()', () => {
  deleteTokenFromStorage();
  expect(mockCookieRemove.mock.calls.length).toBe(1);
});
