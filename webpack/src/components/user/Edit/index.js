import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Field } from 'redux-form'
import ErrorMessage from 'components/ui/ErrorMessage'

import styles from './styles.css'

function UserEdit({ handleSubmit, initialValues, submitHandler, pristine, submitting, intl: { formatMessage } }) {
  console.log('initialValues', initialValues)

  return (
    <div className="container">
      <div className="row">

        <div className="col-md-6 offset-md-3">
          <div className={styles['register-wrap']}>
            <div className="card">
              <div className="card-header text-center">
                <h2> <FormattedMessage id="user.edit.header" /> </h2>
              </div>
              <div className="card-block">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <Field
                    type="hidden"
                    component="input"
                    name="id"
                  />

                  <ErrorMessage name="username" />
                  <div className="input-group mb-3">
                    <Field
                      type="text"
                      component="input"
                      className="form-control"
                      name="username"
                      placeholder={formatMessage({ id: 'user.edit.username' })}
                      aria-label={formatMessage({ id: 'user.edit.username' })}
                    />
                  </div>

                  <ErrorMessage name="email" />
                  <div className="input-group mb-3">
                    <Field
                      type="text"
                      component="input"
                      className="form-control"
                      name="email"
                      placeholder={formatMessage({ id: 'user.edit.email' })}
                      aria-label={formatMessage({ id: 'user.edit.email' })}
                    />
                  </div>

                  <button className="btn btn-primary mb-3" type="submit" disabled={pristine || submitting}>
                    <FormattedMessage id="user.edit.submit" />
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

UserEdit.propTypes = {
  intl: intlShape,
  handleSubmit: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  initialValues: PropTypes.object
}

export default injectIntl(UserEdit)
