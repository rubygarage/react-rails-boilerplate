import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './button.css';

function Button({
  children, href, to, color, size, className, disabled, onClick, type,
}) {
  const classes = classNames(styles.btn, styles[color || 'blue'], styles[size], className);

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      // eslint-disable-next-line
      <Link to={to} className={classes} disabled={disabled} onClick={onClick}>{children}</Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>{children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  href: '',
  to: '',
  size: 'md',
};

export default Button;
