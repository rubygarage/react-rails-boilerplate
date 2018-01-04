import React from 'react';
import { shallow } from 'enzyme';
import Landing from 'components/static/Landing';

describe('<Landing />', () => {
  it('renders Landing component', () => {
    const component = shallow(<Landing />);

    expect(component).toMatchSnapshot();
  });
});
