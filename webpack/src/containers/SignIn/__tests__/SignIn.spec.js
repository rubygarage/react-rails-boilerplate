import React from 'react';
import shallowWithIntl from 'helpers/intl-enzyme';
import SignInContainer from 'containers/SignIn';

describe('SignIn container', () => {
  const container = shallowWithIntl(<SignInContainer />);

  it('renders SignIn component', () => {
    expect(container).toMatchSnapshot();
  });
});
