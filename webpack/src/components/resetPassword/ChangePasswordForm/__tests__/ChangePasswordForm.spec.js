import React from 'react';
import { shallow } from 'enzyme';
import { ChangePasswordForm } from 'components/resetPassword/ChangePasswordForm';

describe('<ChangePasswordForm />', () => {
  let props = {
    intl: { formatMessage: jest.fn() },
    handleSubmit: jest.fn(),
    submitHandler: jest.fn(),
  };

  it('renders ChangePasswordForm component', () => {
    const component = shallow(<ChangePasswordForm {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders with pristine = true', () => {
    props = {
      ...props,
      pristine: true,
    };

    const component = shallow(<ChangePasswordForm {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders with submitting = true', () => {
    props = {
      ...props,
      submitting: true,
    };

    const component = shallow(<ChangePasswordForm {...props} />);

    expect(component).toMatchSnapshot();
  });
});
