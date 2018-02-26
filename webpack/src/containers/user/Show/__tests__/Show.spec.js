import React from 'react';
import UserShowContainer from 'containers/user/Show';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

describe('UserShow container', () => {
  const store = configureStore()({
    entities: { users: { 1: { id: '1', username: 'name' } } },
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

  const container = shallow(<UserShowContainer {...defaultProps} />);

  it('renders UserShow component', () => {
    expect(container).toMatchSnapshot();
  });

  it('map state and dispatch to props', () => {
    expect(container.props()).toEqual(expect.objectContaining({
      getUserAction: expect.any(Function),
      id: '1',
      user: { id: '1', username: 'name' },
      match: { params: { id: '1' } },
    }));
  });
});
