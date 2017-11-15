import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'components/ui/UserAvatar'

class Value extends Component {
  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.object
  }

  render() {
    return (
      <div className="Select-value" title={this.props.value.title}>
        <div className="Select-value-label flex align-center height-full">
          <UserAvatar size="sm" className="user-select-avatar" bgimage={this.props.value.avatarUrl} />
          <span className="user-select-value-text">{this.props.children}</span>
        </div>
      </div>
    )
  }
}

export default Value
