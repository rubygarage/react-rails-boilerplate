import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'redux-form';

class ErrorMessage extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  field = ({ meta: { touched, error } }) => (
    <div className={classNames({ hidden: !(touched && error) }, 'alert', 'alert-danger')}>
      { touched && error && <p className="error-message">{error}</p> }
    </div>
  )

  render() {
    const { name } = this.props;

    return (
      <Field name={name} component={this.field} />
    );
  }
}

export default ErrorMessage;
