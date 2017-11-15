import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

function Tooltip({ effect, children }) {
  return (
    <ReactTooltip effect={effect} className="tooltip">
      <a href="" className="tooltip-close"><i className="icon icon-cross-circle" /></a>
      {children}
    </ReactTooltip>
  )
}

Tooltip.propTypes = {
  children: PropTypes.object,
  effect: PropTypes.string
}

Tooltip.defaultProps = {
  effect: 'solid'
}

export default Tooltip
