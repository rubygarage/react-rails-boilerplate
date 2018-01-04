import React from 'react';
import { shallow } from 'enzyme';
import OauthLink from 'components/OauthLink';

describe('<OauthLink />', () => {
  const defaultProps = {
    onClick: jest.fn(),
    type: 'icon-fb',
  };

  it('renders oauth link', () => {
    const component = shallow(<OauthLink {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });
});
