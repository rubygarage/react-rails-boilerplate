import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser as getUserSaga } from 'sagas/user';
import { getUser } from 'selectors/user';
import getUserAction from 'actions/user';
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
  }

  componentDidMount() {
    if (this.props.user.id) { return; }
    this.props.getUserAction(this.props.id);
  }

  avatarRemovalHandler() { // eslint-disable-line class-methods-use-this
    console.log('AVATAR REMOVAL HANDLER()');
    // TODO: delete avatar makes request to its own dedicated endpoint
  }

  render() {
    const props = {
      ...this.props,
      submitHandler: submit,
      avatarRemovalHandler: this.avatarRemovalHandler,
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

const mapDispatchToProps = { getUserAction };

function preload(params, req, res) {
  const sagasToComplete = [];
  sagasToComplete.push([getUserSaga, params, req, res]);

  return sagasToComplete;
}
UserEdit.preload = preload;

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(reduxForm({
  form: 'userEdit',
})(UserEdit)));
