import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ErrorMessage from 'components/ui/ErrorMessage';

import styles from './styles.css';

export function SignIn({
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
                <h2> <FormattedMessage id="sign_in.login" /> </h2>
              </div>
              <div className="card-block">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <ErrorMessage name="username" />

                  <div className="input-group mb-3">
                    <Field
                      type="text"
                      component="input"
                      className="form-control"
                      name="username"
                      placeholder={formatMessage({ id: 'sign_up.username' })}
                      aria-label={formatMessage({ id: 'sign_up.username' })}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <Field
                      type="password"
                      component="input"
                      className="form-control"
                      name="password"
                      placeholder={formatMessage({ id: 'sign_up.password' })}
                      aria-label={formatMessage({ id: 'sign_up.password' })}
                    />
                  </div>

                  <div>
                    <Field id="remember" name="remember" component="input" className="mr-2" type="checkbox" />
                    <label htmlFor="remember">
                      <FormattedMessage id="sign_in.remember_me" />
                    </label>
                  </div>

                  <button className="btn btn-primary mb-3" type="submit" disabled={pristine || submitting}>
                    <FormattedMessage id="sign_in.login" />
                  </button>

                </form>
                <p>
                  <FormattedMessage id="sign_in.not_a_member_yet" />
                  &nbsp;
                  <Link to="/sign_up">
                    <FormattedMessage id="sign_in.register" />
                  </Link>
                </p>

                <p>
                  <Link to="/reset_password">
                    <FormattedMessage id="sign_in.forgot_password" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

SignIn.propTypes = {
  intl: intlShape,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default injectIntl(SignIn);
