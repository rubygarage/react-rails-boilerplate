import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'components/ui/UserAvatar'

class Option extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
  }

  handleMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  handleMouseEnter = (event) => {
    this.props.onFocus(this.props.option, event)
  }

  handleMouseMove = (event) => {
    if (this.props.isFocused) return

    this.props.onFocus(this.props.option, event)
  }

  render() {
    return (
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}
      >
        <div className="flex align-center">
          <UserAvatar size="sm" className="user-select-avatar" bgimage={this.props.option.avatarUrl} />
          <span className="user-select-value-text">{this.props.children}</span>
        </div>
      </div>
    )
  }
}

export default Option
