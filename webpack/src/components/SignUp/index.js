import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import ErrorMessage from 'components/ui/ErrorMessage';
import Oauth from 'containers/Oauth';

import styles from './styles.css';

function SignUp({
  handleSubmit, submitHandler, pristine, submitting, intl: { formatMessage },
}) {
  return (
    <div className="container">
      <div className="row">

        <div className="col-md-6 offset-md-3">
          <div className={styles['register-wrap']}>
            <div className="card">
              <div className="card-header text-center">
                <h2> <FormattedMessage id="sign_up.register" /> </h2>
              </div>
              <div className="text-center">
                <Oauth type="icon-fb" provider="facebook" button />
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

                  <ErrorMessage name="email" />
                  <div className="input-group mb-3">
                    <Field
                      type="text"
                      component="input"
                      className="form-control"
                      name="email"
                      placeholder={formatMessage({ id: 'sign_up.email' })}
                      aria-label={formatMessage({ id: 'sign_up.email' })}
                    />
                  </div>

                  <ErrorMessage name="password" />
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

                  <ErrorMessage name="password_confirmation" />
                  <div className="input-group mb-3">
                    <Field
                      type="password"
                      component="input"
                      className="form-control"
                      name="password_confirmation"
                      placeholder={formatMessage({ id: 'sign_up.confirm_password' })}
                      aria-label={formatMessage({ id: 'sign_up.confirm_password' })}
                    />
                  </div>

                  <button className="btn btn-primary mb-3" type="submit" disabled={pristine || submitting}>
                    <FormattedMessage id="sign_up.register" />
                  </button>
                </form>

                <p>
                  <FormattedMessage id="sign_up.already_member" />
                  &nbsp;
                  <Link to="/sign_in">
                    <FormattedMessage id="sign_up.login" />
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

SignUp.propTypes = {
  intl: intlShape,
  handleSubmit: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default SignUp;
