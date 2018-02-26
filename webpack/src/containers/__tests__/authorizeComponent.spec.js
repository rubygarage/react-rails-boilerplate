import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import authorizeComponent from '../authorizeComponent';

describe('authorizeComponent HoC', () => {
  const defaultProps = {
    match: {
      params: {
        id: '1',
      },
    },
  };
  const MockComponent = () => <div>Mock Component</div>;
  const WrappedComponent = authorizeComponent(MockComponent);

  describe('user is authorized', () => {
    const store = configureStore()({
      entities: {
        users: {
          1: { id: '1', username: 'name' },
          2: { id: '2', username: 'name2' },
        },
      },
      signin: { currentUser: { users: ['1'] } },
    });

    it('renders given component', () => {
      const authenticatedContainer = mount(<WrappedComponent {...defaultProps} store={store} />);
      expect(authenticatedContainer).toMatchSnapshot();
    });

    it('allows to use custom authorization function', () => {
      const WithCustomFunction = authorizeComponent(
        MockComponent,
        undefined,
        (currentUser, match) => (currentUser.username === 'name' && match.params.id === '3'),
      );
      const customProps = { match: { params: { id: '3' } } };
      const authenticatedContainer = mount(<WithCustomFunction {...customProps} store={store} />);
      expect(authenticatedContainer).toMatchSnapshot();
    });
  });

  describe('user is not authorized', () => {
    const unauthorizedStore = configureStore()({
      entities: {
        users: {
          1: { id: '1', username: 'name' },
          2: { id: '2', username: 'name2' },
        },
      },
      signin: { currentUser: { users: ['2'] } },
    });

    it('renders Redirect component', () => {
      const unauthorizedContainer = mount((
        // keyLength={0} to stop snapshots from failing due to randomly generated keys
        <MemoryRouter keyLength={0} >
          <WrappedComponent
            {...defaultProps}
            store={unauthorizedStore}
          />
        </MemoryRouter>
      ));
      expect(unauthorizedContainer).toMatchSnapshot();
    });

    it('allows to set fallback location', () => {
      const WrappedComponentWithFallback = authorizeComponent(MockComponent, '/other_location');
      const unauthorizedContainer = mount((
        <MemoryRouter keyLength={0} >
          <WrappedComponentWithFallback
            {...defaultProps}
            store={unauthorizedStore}
          />
        </MemoryRouter>
      ));
      expect(unauthorizedContainer).toMatchSnapshot();
    });
  });
});
