import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/ui/Icon';
import Button from 'components/ui/Button';

function OauthLink({ type, onClick }) {
  return (
    <Button className="social-round-icon" onClick={onClick}>
      <Icon type={type} />
    </Button>
  );
}

OauthLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default OauthLink;
