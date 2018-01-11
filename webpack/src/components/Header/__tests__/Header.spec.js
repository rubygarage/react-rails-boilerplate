import React from 'react';
import Header from 'components/Header';
import { shallow } from 'enzyme';

describe('<Header />', () => {
  it('render header with sign in button', () => {
    const props = {
      currentUser: {},
      currentUserProfileLink: '',
      handleSignOut: jest.fn(),
    };

    const component = shallow(<Header {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('render header with Sign Out and Show Profile', () => {
    const props = {
      currentUser: { id: 1 },
      currentUserProfileLink: '/user/profile',
      handleSignOut: jest.fn(),
    };

    const component = shallow(<Header {...props} />);

    expect(component).toMatchSnapshot();
  });
});
