import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUser } from 'selectors/user';

function authorizeComponent(
  WrappedComponent,
  fallbackLocation = '/404',
  authorizingFunction = (currentUser, match) => (currentUser.id === match.params.id),
) {
  const mapStateToProps = state => ({ currentUser: getCurrentUser(state) });
  return connect(mapStateToProps)((props) => {
    if (!authorizingFunction(props.currentUser, props.match)) {
      return <Redirect to={fallbackLocation} />;
    }
    return <WrappedComponent {...props} />;
  });
}

export default authorizeComponent;
