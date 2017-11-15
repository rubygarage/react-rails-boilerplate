import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import UserSelect from 'components/ui/UserSelect'
import { loadUserPages } from 'actions/users'
import { profilesOptions } from 'selectors/user'

export class PortfolioSelect extends Component {
  static propTypes = {
    profilesOptions: PropTypes.array,
    loadUserPages: PropTypes.func,
    change: PropTypes.func
  }

  loadUserPages = (params, callback) => {
    new Promise((resolve, reject) => {
      this.props.loadUserPages({ params }, resolve, reject)
    }).then(() => {
      this.props.change('entity', this.props.profilesOptions[0].value)
      callback(null, { options: this.props.profilesOptions, complete: true })
    })
  }

  debouncedLoadUserPages = debounce((prefix, callback) => {
    this.loadUserPages({ prefix }, callback)
  }, 1000)

  render() {
    return (
      <UserSelect
        name="entity"
        type="text"
        className="select-web width-full"
        disabled={false}
        clearable={false}
        searchable={false}
        arrowText=" "
        getOptions={this.debouncedLoadUserPages}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  profilesOptions: profilesOptions(state)
})

const mapDispatchToProps = { loadUserPages }

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioSelect)
