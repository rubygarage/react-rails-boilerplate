import React from 'react';
import { shallow } from 'enzyme';
import SignUp from 'components/SignUp';

describe('<SigniIn />', () => {
  let props = {
    handleSubmit: jest.fn(),
    submitHandler: jest.fn(),
    intl: {
      formatDate: jest.fn(),
      formatTime: jest.fn(),
      formatRelative: jest.fn(),
      formatNumber: jest.fn(),
      formatPlural: jest.fn(),
      formatMessage: jest.fn(),
      formatHTMLMessage: jest.fn(),
      now: jest.fn(),
    },
  };

  it('renders sign up form and submitting is false', () => {
    props = {
      ...props,
      submitting: false,
    };
    const component = shallow(<SignUp {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders sign up form and pristine is true', () => {
    props = {
      ...props,
      pristine: true,
    };

    const component = shallow(<SignUp {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders sign up form submitting is true', () => {
    props = {
      ...props,
      submitting: true,
    };

    const component = shallow(<SignUp {...props} />);

    expect(component).toMatchSnapshot();
  });
});
