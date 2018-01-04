import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

function NotFound() {
  return (
    <div className={styles['nb-error']}>
      <div className={styles['error-code']}> <FormattedMessage id="not_found.404" /> </div>
      <h3 className="font-bold"> <FormattedMessage id="not_found.title" /> </h3>

      <div className={styles['error-desc']}>
        <p> <FormattedMessage id="not_found.sorry" /> </p>
        <p> <FormattedMessage id="not_found.try" /> </p>

        <ul className="list-inline text-center text-sm">
          <li className="list-inline-item">
            <Link to="/">
              <FormattedMessage id="not_found.to_home" />
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/sign_up">
              <FormattedMessage id="not_found.sign_up" />
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/sign_up">
              <FormattedMessage id="not_found.sign_in" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NotFound;
