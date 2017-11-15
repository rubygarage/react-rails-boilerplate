import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'components/ui/Icon'

import styles from './tab-card.css'

export class TabCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    iconClass: PropTypes.string,
    onClick: PropTypes.func,
    tabName: PropTypes.string
  }

  handleTabSwitch = () => {
    const { tabName } = this.props
    if (tabName === 'text') { // TODO remove this when text card will be implemented
      return
    }

    this.props.onClick(tabName)
  }

  render() {
    const { className, color, text, type, icon, iconClass, tabName } = this.props

    return (
      <div
        className={
          classNames(
            { [styles.disable]: tabName === 'text' }, // TODO remove this when text card will be implemented
            styles.tab,
            styles[type],
            styles[color],
            className,
            'tab-theme'
          )
        }
        onClick={this.handleTabSwitch}
      >
        <Icon type={icon} className={iconClass} />
        <span>
          {text}
        </span>
      </div>
    )
  }
}

export default TabCard
