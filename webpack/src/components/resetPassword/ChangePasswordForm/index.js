import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ErrorMessage from 'components/ui/ErrorMessage';

import styles from './styles.css';

export function ChangePasswordForm({
  handleSubmit,
  pristine,
  submitHandler,
  submitting,
  intl: { formatMessage },
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className={styles['register-wrap']}>
            <div className="card">
              <div className="card-header text-center">
                <h2> <FormattedMessage id="restore_password.header" /> </h2>
              </div>
              <div className="card-block">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <ErrorMessage name="password" />
                  <div className="input-group mb-3">
                    <Field
                      type="password"
                      component="input"
                      className="form-control"
                      name="password"
                      placeholder={formatMessage({ id: 'restore_password.new_password' })}
                      aria-label={formatMessage({ id: 'restore_password.new_password' })}
                    />
                  </div>

                  <ErrorMessage name="password_confirmation" />
                  <div className="input-group mb-3">
                    <Field
                      type="password"
                      component="input"
                      className="form-control"
                      name="password_confirmation"
                      placeholder={formatMessage({ id: 'restore_password.confirm_password' })}
                      aria-label={formatMessage({ id: 'restore_password.confirm_password' })}
                    />
                  </div>

                  <button className="btn btn-primary mb-3" type="submit" disabled={pristine || submitting}>
                    <FormattedMessage id="restore_password.change_my_password" />
                  </button>

                </form>

                <Link className="mr-3" to="/sign_up">
                  <FormattedMessage id="sign_in.register" />
                </Link>

                <Link className="mr-3" to="/sign_in">
                  <FormattedMessage id="sign_up.login" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChangePasswordForm.propTypes = {
  intl: intlShape,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default injectIntl(ChangePasswordForm);
