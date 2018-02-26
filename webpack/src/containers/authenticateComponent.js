import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from 'selectors/user';

function authenticateComponent(WrappedComponent) {
  const mapStateToProps = state => ({ currentUser: getCurrentUser(state) });
  return connect(mapStateToProps)((props) => {
    if (!props.currentUser.id) { return <Redirect to="/sign_in" />; }
    return <WrappedComponent {...props} />;
  });
}

export default authenticateComponent;
