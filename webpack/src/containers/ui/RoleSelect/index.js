import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import debounce from 'lodash/debounce'
import RoleSelectComponent from 'components/ui/RoleSelect'
import { getAllowedInvitationRoles } from 'actions/invitation'
import { invitationRolesOptions } from 'selectors/role'

export class RoleSelect extends Component {
  static propTypes = {
    intl: intlShape,
    invitationRolesOptions: PropTypes.array,
    getAllowedInvitationRoles: PropTypes.func
  }

  loadRoles = (params, callback) => {
    new Promise((resolve, reject) => {
      this.props.getAllowedInvitationRoles(resolve, reject)
    }).then(() => {
      callback(null, { options: this.props.invitationRolesOptions, complete: true })
    })
  }

  debouncedLoadRoles = debounce((prefix, callback) => {
    this.loadRoles({ prefix }, callback)
  }, 1000)

  render() {
    const { intl: { formatMessage } } = this.props

    return (
      <RoleSelectComponent
        name="role"
        type="text"
        className="select-web width-full"
        disabled={false}
        clearable={false}
        searchable={false}
        placeholder={formatMessage({ id: 'invitation.role_placeholder' })}
        arrowText=" "
        getOptions={this.debouncedLoadRoles}
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  invitationRolesOptions: invitationRolesOptions(state, props)
})

const mapDispatchToProps = { getAllowedInvitationRoles }

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(RoleSelect))
