import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import HeaderContainer, { Header } from 'containers/Header';
import diveTo from 'helpers/diveTo-enzyme';

describe('Header container', () => {
  const store = configureStore()({
    entities: { users: { 1: { id: '1', username: 'name' } } },
    signin: { currentUser: { users: ['1'] } },
  });
  store.dispatch = jest.fn();

  const defaultProps = {
    store,
  };

  const container = shallow(<HeaderContainer {...defaultProps} />);
  const instance = diveTo(container, Header).instance();
  it('renders Header component', () => {
    expect(container).toMatchSnapshot();
  });

  it('map state and dispatch to props', () => {
    expect(container.props()).toEqual(expect.objectContaining({
      signOut: expect.any(Function),
      currentUser: { id: '1', username: 'name' },
    }));
  });

  it('returns current user profile link', () => {
    expect(instance.currentUserProfileLink).toBe('/user/1');
  });

  it('handleSignOut dispatches signOut action', () => {
    const mockEvent = { preventDefault: jest.fn() };
    instance.handleSignOut(mockEvent);
    expect(store.dispatch.mock.calls[0][0]).toEqual({ type: 'SIGN_OUT_REQUEST' });
  });
});
