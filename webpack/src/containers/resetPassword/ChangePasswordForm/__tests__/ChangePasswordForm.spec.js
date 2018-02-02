import React from 'react';
import shallowWithIntl from 'helpers/intl-enzyme';
import configureStore from 'redux-mock-store';
import ChangePasswordForm from 'containers/resetPassword/ChangePasswordForm';

describe('ChangePasswordForm container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  const defaultProps = {
    match: {
      params: {
        reset_password_token: 'token',
      },
    },
    store,
  };

  const container = shallowWithIntl(<ChangePasswordForm {...defaultProps} />);

  it('renders ChangePasswordForm component', () => {
    expect(container).toMatchSnapshot();
  });

  it('map state and dispatch to props', () => {
    expect(container.props()).toEqual(expect.objectContaining({
      initialValues: { reset_token: 'token' },
    }));
  });
});
