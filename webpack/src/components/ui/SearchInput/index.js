import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'components/ui/Icon'
import Input from 'components/ui/Input'
import { injectIntl } from 'react-intl'
import { reduxForm } from 'redux-form'

import styles from './styles.css'

function SearchInput({ classLabel, className, disabled }) {
  return (
    <label className={classNames(styles['label-search'], classLabel)} name="text">
      <Input
        name="search"
        type="text"
        placeholder="Search"
        disabled={disabled}
        className={classNames(styles['input-search'], className, { [styles.disable]: disabled })}
      />
      <Icon type="icon-search" className={classNames(styles['search-icon'])} />
    </label>
  )
}

SearchInput.propTypes = {
  className: PropTypes.string,
  classLabel: PropTypes.string,
  disabled: PropTypes.bool
}

export default injectIntl(reduxForm({
  form: 'searchInput'
})(SearchInput))
