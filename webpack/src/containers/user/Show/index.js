import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser as getUserSaga } from 'sagas/user'
import { getUser as getUserAction } from 'actions/user'
import { getUser } from 'selectors/user'
import UserComponent from 'components/user/Show'

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    id: PropTypes.string.isRequired,
    getUserAction: PropTypes.func.isRequired,
    userEditUrl: PropTypes.string
  }

  componentDidMount() {
    if (this.props.user.id) { return }
    this.props.getUserAction(this.props.id)
  }

  render() {
    const { user, userEditUrl } = this.props
    const userShowProps = {
      userEditUrl,
      user
    }

    return <UserComponent {...userShowProps} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const user = getUser(state, id)

  return {
    userEditUrl: `/user/${user.id}/edit`,
    user,
    id
  }
}

const mapDispatchToProps = { getUserAction }

function preload(params, req, res) {
  const sagasToComplete = []
  sagasToComplete.push([getUserSaga, params, req, res])

  return sagasToComplete
}
User.preload = preload

export default connect(mapStateToProps, mapDispatchToProps)(User)
