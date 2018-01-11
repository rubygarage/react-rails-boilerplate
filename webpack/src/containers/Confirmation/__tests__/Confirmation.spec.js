import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConfirmationContainer from 'containers/Confirmation';

describe('<Confirmation />', () => {
  const defaultProps = {
    getEmailConfirmation: jest.fn(),
    loading: false,
    params: {
      confirmationToken: '4321',
    },
  };

  it('maps dispatch to props', () => {
    const store = configureStore()({
      emailConfirmation: {
        loading: false,
      },
    });
    const container = shallow(<ConfirmationContainer store={store} {...defaultProps} />);

    expect(container.props()).toEqual(expect.objectContaining({
      getEmailConfirmation: expect.any(Function),
      loading: expect.any(Boolean),
    }));
  });
});
