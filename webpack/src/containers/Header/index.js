import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentUser } from 'selectors/user'
import { signOut } from 'actions/signout'

import HeaderComponent from 'components/Header'

class Header extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    signOut: PropTypes.func.isRequired
  }

  get currentUserProfileLink() {
    return `/user/${this.props.currentUser.id}`
  }

  handleSignOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  render() {
    const props = {
      currentUser: this.props.currentUser,
      currentUserProfileLink: this.currentUserProfileLink,
      handleSignOut: this.handleSignOut
    }

    return (<HeaderComponent {...props} />)
  }

}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state)
})

const mapDispatchToProps = { signOut }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
