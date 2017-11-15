import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import classNames from 'classnames'
import Icon from 'components/ui/Icon'

import styles from './modal.css'

function MainModal({ title, children, className, overlayClass, onClose }) {
  return (
    <Modal
      isOpen={true}
      className={classNames(styles['modal-content'], className)}
      overlayClassName={classNames(styles.overlay, styles[overlayClass])}
      contentLabel="Modal"
    >
      <a href="" onClick={onClose} className={styles['close-modal']}>
        <span>Close</span>
        <Icon type="icon-cross-circle" className="font-24 ml-5" />
      </a>
      <p className={styles['modal-title']}>{title}</p>
      <div className={styles['modal-body']}>
        {children}
      </div>
    </Modal>
  )
}

MainModal.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
  overlayClass: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node
}

export default MainModal
