import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser as getUserSaga } from 'sagas/user';
import { getUser } from 'selectors/user';
import getUserAction from 'actions/user';
import UserComponent from 'components/user/Show';

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
    getUserAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.user.id) { return; }
    this.props.getUserAction(this.props.id);
  }

  render() {
    return <UserComponent user={this.props.user} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  return {
    user: getUser(state, id),
    id,
  };
};

const mapDispatchToProps = { getUserAction };

function preload(params, req, res) {
  const sagasToComplete = [];
  sagasToComplete.push([getUserSaga, params, req, res]);

  return sagasToComplete;
}
User.preload = preload;

export default connect(mapStateToProps, mapDispatchToProps)(User);
