import React, { Component } from 'react'
import { connect } from 'react-redux'
import { emailConfirmation as emailConfirmationSaga } from 'sagas/emailConfirmation'
import ConfirmationComponent from 'components/Confirmation'

export class Confirmation extends Component {
  render() {
    return (
      <ConfirmationComponent {...this.props} />
    )
  }
}

function preload(params, req, res) {
  const sagasToComplete = []
  const { confirmation_token } = params

  sagasToComplete.push([emailConfirmationSaga, { confirmation_token }, res]) // eslint-disable-line

  return sagasToComplete
}

Confirmation.preload = preload

export default connect()(Confirmation)
