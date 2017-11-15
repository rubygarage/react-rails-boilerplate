import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './tabs-card.css'

function TabsCard({ className, children }) {
  return (
    <div className={classNames(styles.tabs, className)}>
      {children}
    </div>
  )
}

TabsCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array
}

export default TabsCard
