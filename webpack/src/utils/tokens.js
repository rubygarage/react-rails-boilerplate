import Cookies from 'universal-cookie';
import { isClient } from 'helpers/server';

const ROOT_PATH = '/';

export const setTokenToStorage = (headers) => {
  const authToken = headers.authorization;

  if (isClient()) {
    const cookies = new Cookies();
    cookies.set('authToken', authToken, { path: ROOT_PATH });
  }
};

export const deleteTokenFromStorage = () => {
  const cookies = new Cookies();
  cookies.remove('authToken', { path: ROOT_PATH });
};
