import { normalize } from 'normalize-json-api';
import { setTokenToStorage, deleteTokenFromStorage } from 'utils/tokens';
import { isClient } from 'helpers/server';
import ApiClient from 'utils/apiClient';

const authorizeUser = (req, resolve) => {
  const apiClient = new ApiClient().buildClient(req);

  apiClient.get('/api/v1/auth/users/session').then((response) => {
    const { entities, results } = normalize(response.data);

    if (isClient()) { setTokenToStorage(response.headers); }
    resolve({ currentUser: results, entities });
  }).catch(() => {
    deleteTokenFromStorage();
    resolve({ currentUser: {}, entities: {} });
  });
};

export default authorizeUser;
