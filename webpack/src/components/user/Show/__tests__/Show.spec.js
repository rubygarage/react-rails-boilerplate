import React from 'react';
import { shallow } from 'enzyme';
import User from 'components/user/Show';

describe('Show user', () => {
  const defaultProps = {
    user: {
      username: 'Boiler',
      email: 'example@boiler.com',
    },
    intl: {
      formatMessage: (...params) => (`intl.formatMessage(${JSON.stringify(params)})`),
    },
  };

  it('get info at the page', () => {
    const component = shallow(<User {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  it('empty info at the page', () => {
    const props = { ...defaultProps, user: {} };
    const component = shallow(<User {...props} />);
    expect(component).toMatchSnapshot();
  });
});
