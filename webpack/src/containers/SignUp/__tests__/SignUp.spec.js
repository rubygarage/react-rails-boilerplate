import React from 'react';
import shallowWithIntl from 'helpers/intl-enzyme';
import SignUpContainer from 'containers/SignUp';

describe('SignUp container', () => {
  const container = shallowWithIntl(<SignUpContainer />);

  it('renders SignUp component', () => {
    expect(container).toMatchSnapshot();
  });
});
