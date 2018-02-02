import React from 'react';
import configureStore from 'redux-mock-store';
import RequestFormContainer, { ResetPasswordRequestForm } from 'containers/resetPassword/RequestForm';
import shallowWithIntl from 'helpers/intl-enzyme';
import diveTo from 'helpers/diveTo-enzyme';

const mockSubmit = jest.fn();
jest.mock('containers/resetPassword/RequestForm/submit', () => (
  (...args) => mockSubmit(...args)
));

describe('RequestForm container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const defaultProps = {
    store,
  };

  const wrapper = shallowWithIntl(<RequestFormContainer {...defaultProps} />);
  const instance = diveTo(wrapper, ResetPasswordRequestForm).instance();

  it('renders RequestForm component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('sets resetRequestSubmitted', () => {
    instance.setResetRequestSubmitted(true);
    expect(instance.state.resetRequestSubmitted).toBe(true);
  });

  it('passes setResetRequestSubmitted to the submit', () => {
    instance.submitAndHandleStateChange({ some: 'values' }, store.dispatch, {});
    expect(mockSubmit.mock.calls[0][2].setResetRequestSubmitted)
      .toBe(instance.setResetRequestSubmitted);
  });

  it('map state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      sendRestorePasswordEmail: expect.any(Function),
    }));
  });
});
