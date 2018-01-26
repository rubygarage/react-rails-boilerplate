import React from 'react';
import PropTypes from 'prop-types';
import Header from 'containers/Header';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field } from 'redux-form';
import ErrorMessage from 'components/ui/ErrorMessage';
import AvatarUploader from 'containers/AvatarUploader';
import Button from 'components/ui/Button';

function UserEdit({
  user, handleSubmit, submitHandler,
  pristine, submitting, intl: { formatMessage },
  avatarFieldValue, avatarRemovalHandler,
}) {
  return (
    <main>
      <Header />
      <div className="jumbotron">
        <p className="lead">
          User profile edit page for {user.username}
        </p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <p>{formatMessage({ id: 'user_edit.avatar' })}</p>
          {
            (user.avatarThumb && !avatarFieldValue) &&
              <div className="avatarEdit">
                <img src={user.avatarThumb} alt="User avatar" className="avatarThumb" />
                <br />
                <Button
                  className="btn btn-primary mb-3"
                  type="button"
                  disabled={!user.avatarThumb}
                  onClick={() => avatarRemovalHandler(user.id, user.avatar)}
                >
                  Remove avatar
                </Button>
              </div>
          }
          <ErrorMessage name="avatar" />
          <div className="input-group mb-3">
            <Field
              multiple={false}
              component={AvatarUploader}
              className="form-control"
              name="avatar"
            />
          </div>
          <button
            className="btn btn-primary mb-3"
            type="submit"
            disabled={pristine || submitting}
          >
            <FormattedMessage id="user_edit.save_changes" />
          </button>
        </form>
      </div>
    </main>
  );
}

UserEdit.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    avatarThumb: PropTypes.string,
    avatarFull: PropTypes.string,
  }),
  avatarRemovalHandler: PropTypes.func.isRequired,
  intl: intlShape,
  handleSubmit: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  avatarFieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default UserEdit;
