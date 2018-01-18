import rootReducer from 'reducers/rootReducer';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import signin from 'reducers/signin';
import entities from 'reducers/entities';
import signup from 'reducers/signup';
import locale from 'reducers/locale';
import user from 'reducers/user';

const reducers = combineReducers({
  form,
  entities,
  signin,
  signup,
  user,
  locale,
});

export default rootReducer(reducers);
