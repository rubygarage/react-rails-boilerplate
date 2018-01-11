import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Field } from 'redux-form'
import ErrorMessage from 'components/ui/ErrorMessage'
import Header from 'containers/Header'
import FileUpload from 'components/ui/FileUpload'

import styles from './styles.css'

export function EditUser({ intl: { formatMessage }, pristine, submitting, initialValues }) {
  return (
    <main>
      <Header />
      <div className="container">
        <div className="row">

          <div className="col-md-6 offset-md-3">
            <div className={styles['edit-wrap']}>
              <div className="card">
                <div className="card-header text-center">
                  <h2> <FormattedMessage id="edit_user.edit_title" /></h2>
                </div>
                <div className="card-block">
                  <form>
                    <div className="input-group mb-3">
                      <FileUpload />
                    </div>
                    <ErrorMessage name="username" />
                    <div className="input-group mb-3">
                      <Field
                        type="text"
                        component="input"
                        className="form-control"
                        name="username"
                        placeholder={formatMessage({ id: 'edit_user.username' })}
                        aria-label={formatMessage({ id: 'edit_user.username' })}
                        disabled
                      />
                    </div>

                    <ErrorMessage name="email" />
                    <div className="input-group mb-3">
                      <Field
                        type="text"
                        component="input"
                        className="form-control"
                        name="email"
                        placeholder={formatMessage({ id: 'edit_user.your_email' })}
                        aria-label={formatMessage({ id: 'edit_user.your_email' })}
                        disabled
                      />
                    </div>

                    <ErrorMessage name="password" />
                    <div className="input-group mb-3">
                      <Field
                        type="password"
                        component="input"
                        className="form-control"
                        name="password"
                        placeholder={formatMessage({ id: 'edit_user.current_password' })}
                        aria-label={formatMessage({ id: 'edit_user.current_password' })}
                      />
                    </div>

                    <ErrorMessage name="new_password" />
                    <div className="input-group mb-3">
                      <Field
                        type="password"
                        component="input"
                        className="form-control"
                        name="new_password"
                        placeholder={formatMessage({ id: 'edit_user.new_password' })}
                        aria-label={formatMessage({ id: 'edit_user.new_password' })}
                      />
                    </div>

                    <ErrorMessage name="password_confirmation" />
                    <div className="input-group mb-3">
                      <Field
                        type="password"
                        component="input"
                        className="form-control"
                        name="password_confirmation"
                        placeholder={formatMessage({ id: 'edit_user.confirm_password' })}
                        aria-label={formatMessage({ id: 'edit_user.confirm_password' })}
                      />
                    </div>

                    <button className="btn btn-primary mb-3" type="submit" disabled={pristine || submitting}>
                      <FormattedMessage id="edit_user.edit_btn" />
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

EditUser.propTypes = {
  intl: intlShape,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  // currentUser: PropTypes.shape({
  //   username: PropTypes.string,
  //   email: PropTypes.string
  // })
  initialValues: PropTypes.object
}

export default injectIntl(EditUser)
