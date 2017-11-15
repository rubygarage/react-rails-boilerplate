import React from 'react'
import { shallow } from 'enzyme'
import classNames from 'classnames'
import ColoredRadioButton from 'components/ui/ColoredRadioButton'

import styles from '../colored.css'

describe('<ColoredRadioButton />', () => {
  const defaultProps = {
    className: classNames(styles['theme-color'], styles.black)
  }

  it('renders with empty props', () => {
    const component = shallow(<ColoredRadioButton />)

    expect(component).toMatchSnapshot()
  })

  it('renders with props', () => {
    const component = shallow(<ColoredRadioButton {...defaultProps} />)

    expect(component).toMatchSnapshot()
  })
})
