import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Field } from 'redux-form'
import ErrorMessage from 'components/ui/ErrorMessage'

import styles from './styles.css'

export function ResetPasswordRequestForm({
  handleSubmit,
  pristine,
  submitHandler,
  submitting,
  intl: { formatMessage }
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

                  <ErrorMessage name="email" />
                  <div className="input-group mb-3">
                    <Field
                      type="text"
                      component="input"
                      className="form-control"
                      name="email"
                      placeholder={formatMessage({ id: 'restore_password.your_email' })}
                      aria-label={formatMessage({ id: 'restore_password.your_email' })}
                    />
                  </div>

                  <button className="btn btn-primary mb-3" type="submit" disabled={pristine || submitting}>
                    <FormattedMessage id="restore_password.send_instructions" />
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

ResetPasswordRequestForm.propTypes = {
  intl: intlShape,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  submitting: PropTypes.bool
}

export default injectIntl(ResetPasswordRequestForm)
