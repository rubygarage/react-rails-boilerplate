import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { getCurrentUser } from 'selectors/user'

import EditUserComponent from 'components/user/Edit'


class UserEdit extends Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const props = {
      initialValues: this.props.initialValues
    }

    return (<EditUserComponent {...props} />)
  }
}

const mapStateToProps = (state) => ({
  initialValues: getCurrentUser(state)
})

export default connect(mapStateToProps)(reduxForm({
  form: 'editUser',
  fieldsForValidation: ['username', 'password']
})(UserEdit))
