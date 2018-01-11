import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationInstructions from 'components/static/ConfirmationInstructions';

describe('<ConfirmationInstructions />', () => {
  it('renders ConfirmationInstructions component', () => {
    const component = shallow(<ConfirmationInstructions />);

    expect(component).toMatchSnapshot();
  });
});
