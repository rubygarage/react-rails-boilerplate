import React from 'react';
import UserEditContainer from 'containers/user/Edit';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('UserEdit container', () => {
  const store = configureStore()({
    entities: { users: { 1: { id: '1', username: 'name' } } },
    form: { userEdit: { values: { avatar: [] } } },
    signin: { currentUser: { users: ['1'] } },
  });
  store.dispatch = jest.fn();

  const defaultProps = {
    match: {
      params: {
        id: '1',
      },
    },
    store,
  };

  const container = shallow(<UserEditContainer {...defaultProps} />);

  it('renders UserEdit component', () => {
    expect(container).toMatchSnapshot();
  });

  it('map state and dispatch to props', () => {
    expect(container.props()).toEqual(expect.objectContaining({
      avatarRemovalHandler: expect.any(Function),
      getUserAction: expect.any(Function),
      id: '1',
      user: { id: '1', username: 'name' },
      avatarFieldValue: [],
      match: { params: { id: '1' } },
    }));
  });
});
