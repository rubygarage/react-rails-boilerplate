import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Root from 'containers/Root/Root.dev';

describe('Root.dev container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  const defaultProps = {
    store,
  };

  const container = shallow(<Root {...defaultProps} />);

  it('renders Root', () => {
    expect(container).toMatchSnapshot();
  });
});
