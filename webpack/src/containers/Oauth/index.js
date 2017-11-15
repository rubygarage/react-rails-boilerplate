import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { oauthRequest } from 'actions/oauth'

import OauthButtonComponent from 'components/OauthButton'
import OauthLinkComponent from 'components/OauthLink'

export class Oauth extends Component {
  static propTypes = {
    color: PropTypes.string,
    button: PropTypes.bool,
    oauthRequest: PropTypes.func,
    provider: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  handleOauthRequest = (event) => {
    event.preventDefault()
    this.props.oauthRequest(this.props.provider)
  }

  render() {
    const { button, color, type } = this.props

    return (
      button
        ? <OauthButtonComponent color={color} type={type} onClick={this.handleOauthRequest} />
        : <OauthLinkComponent type={type} onClick={this.handleOauthRequest} />
    )
  }
}

const mapDispatchToProps = { oauthRequest }

export default connect(null, mapDispatchToProps)(Oauth)
