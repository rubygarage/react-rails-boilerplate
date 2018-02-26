import React from 'react';
import { shallow } from 'enzyme';
import Edit from 'components/user/Edit';

describe('Edit user', () => {
  let props = {
    avatarRemovalHandler: jest.fn(),
    handleSubmit: jest.fn(),
    submitHandler: jest.fn(),
    intl: {
      formatMessage: (...params) => (`intl.formatMessage(${JSON.stringify(params)})`),
    },
  };

  it('shows current info at the page', () => {
    props = {
      ...props,
      user: {
        username: 'Boiler',
        email: 'example@boiler.com',
        avatar: '1',
        avatarFull: 'someaddressFull.jpg',
        avatarThumb: 'someaddressThumb.jpg',
      },
    };
    const component = shallow(<Edit {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('render update form where submit unavailable if form is pristine', () => {
    props = {
      ...props,
      pristine: true,
    };
    const component = shallow(<Edit {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('render update form where submit unavailable if form is submiting', () => {
    props = {
      ...props,
      submiting: true,
    };
    const component = shallow(<Edit {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('render update form where submit available if form is dirty', () => {
    props = {
      ...props,
      dirty: true,
      pristine: false,
    };
    const component = shallow(<Edit {...props} />);

    expect(component).toMatchSnapshot();
  });
});
