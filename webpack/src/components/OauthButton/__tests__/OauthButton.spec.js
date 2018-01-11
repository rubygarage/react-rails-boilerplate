import React from 'react';
import { shallow } from 'enzyme';
import OathButton from 'components/OauthButton';

describe('<OathButton />', () => {
  const defaultProps = {
    color: 'blue-dark',
    onClick: jest.fn(),
    type: 'icon-fb',
  };

  it('renders oauth button', () => {
    const component = shallow(<OathButton {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });
});
