import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { getOmniauthData } from 'selectors/user';
import SignUpComponent from 'components/SignUp';

import validate from './validate';
import submit from './submit';

class SignUpForm extends React.PureComponent {
  static propTypes = {
    initialValues: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
    }),
  }

  render() {
    const props = {
      ...this.props,
      initialValues: this.props.initialValues,
      submitHandler: submit,
    };

    return (
      <SignUpComponent {...props} />
    );
  }
}

const mapStateToProps = state => ({
  initialValues: getOmniauthData(state),
});

export default connect(mapStateToProps)(injectIntl(reduxForm({
  form: 'signUp',
  enableReinitialize: true,
  validate,
})(SignUpForm)));
