import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from 'components/ui/ErrorMessage';

describe('<ErrorMessage />', () => {
  const props = {
    name: 'TestFieldName',
    component: jest.fn(),
  };

  it('renders with empty props', () => {
    const component = shallow(<ErrorMessage />);

    expect(component).toMatchSnapshot();
  });

  it('renders with props', () => {
    const component = shallow(<ErrorMessage {...props} />);

    expect(component).toMatchSnapshot();
  });
});
