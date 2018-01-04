import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';

function OauthButton({ color, type, onClick }) {
  return (
    <Button color={color} size="md" className="mb-20" onClick={onClick}>
      <Icon type={type} className="social-icon" />
    </Button>
  );
}

OauthButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default OauthButton;
