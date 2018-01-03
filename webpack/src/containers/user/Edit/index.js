import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { getUser as getUserAction } from 'actions/user'
import { getUser as getUserSaga } from 'sagas/user'
import { getUser } from 'selectors/user'
import validate from './validate'
import submit from './submit'

import UserEditComponent from 'components/user/Edit'

class UserEdit extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    getUserAction: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.getUserAction(id)
  }

  render() {
    const props = {
      ...this.props,
      submitHandler: submit
    }

    return (
      <UserEditComponent {...props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const user = getUser(state, id)

  const { username, email } = user
  const initialValues = { username, email, id }

  return {
    user,
    id,
    initialValues
  }
}
const mapDispatchToProps = { getUserAction }

function preload(params, req, res) {
  console.log('asasdasdasd')
  const sagasToComplete = []
  sagasToComplete.push([getUserSaga, params, req, res])

  return sagasToComplete
}
UserEdit.preload = preload

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'userEdit',
  enableReinitialize: true,
  validate
})(UserEdit))
