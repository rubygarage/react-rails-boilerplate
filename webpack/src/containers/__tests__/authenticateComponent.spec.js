import React from 'react';
import authenticateComponent from '../authenticateComponent';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

describe('authenticateComponent HoC', () => {
  const defaultProps = {
    match: {
      params: {
        id: '1',
      },
    },
  };
  const MockComponent = () => <div>Mock Component</div>;
  const WrappedComponent = authenticateComponent(MockComponent);

  describe('user is authenticated', () => {
    const store = configureStore()({
      entities: { users: { 1: { id: '1', username: 'name' } } },
      signin: { currentUser: { users: ['1'] } },
    });

    it('renders given component', () => {
      const authenticatedContainer = mount(<WrappedComponent {...defaultProps} store={store} />);
      expect(authenticatedContainer).toMatchSnapshot();
    });
  });

  describe('user is not authenticated', () => {
    const unauthenticatedStore = configureStore()({
      entities: { users: {} },
      signin: { currentUser: { users: [] } },
    });

    it('renders Redirect component if user is not authenticated', () => {
      const unauthenticatedContainer = mount((
        // keyLength={0} to stop snapshots from failing due to randomly generated keys
        <MemoryRouter keyLength={0}>
          <WrappedComponent
            {...defaultProps}
            store={unauthenticatedStore}
          />
        </MemoryRouter>
      ));
      expect(unauthenticatedContainer).toMatchSnapshot();
    });
  });
});
