import React from 'react';
import { shallow } from 'enzyme';
import NotFound from 'components/static/NotFound';

describe('<NotFound />', () => {
  it('renders NotFound component', () => {
    const component = shallow(<NotFound />);

    expect(component).toMatchSnapshot();
  });
});
