import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser as getUserSaga } from 'sagas/user';
import { getUser } from 'selectors/user';
import getUserAction from 'actions/user';
import destroyAvatarAction from 'actions/destroyAvatar';
import UserEditComponent from 'components/user/Edit';
import { reduxForm, formValueSelector } from 'redux-form';
import { injectIntl } from 'react-intl';
import submit from './submit';

class UserEdit extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
      avatarThumb: PropTypes.string,
      avatarFull: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
    getUserAction: PropTypes.func.isRequired,
    avatarRemovalHandler: PropTypes.func.isRequired,
    avatarFieldValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  }

  componentDidMount() {
    if (this.props.user.id) { return; }
    this.props.getUserAction(this.props.id);
  }

  render() {
    const props = {
      ...this.props,
      submitHandler: submit,
      avatarRemovalHandler: this.props.avatarRemovalHandler,
    };
    return <UserEditComponent {...props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  return {
    user: getUser(state, id),
    id,
    avatarFieldValue: formValueSelector('userEdit')(state, 'avatar'),
  };
};

const mapDispatchToProps = { getUserAction, avatarRemovalHandler: destroyAvatarAction };

function preload(params, req, res) {
  const sagasToComplete = [];
  sagasToComplete.push([getUserSaga, params, req, res]);

  return sagasToComplete;
}
UserEdit.preload = preload;

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(reduxForm({
  form: 'userEdit',
})(UserEdit)));
