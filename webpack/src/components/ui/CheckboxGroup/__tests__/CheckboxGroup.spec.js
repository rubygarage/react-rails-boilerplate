import React from 'react'
import { shallow } from 'enzyme'
import CheckboxGroup from 'components/ui/CheckboxGroup'

describe('<CheckboxGroup />', () => {
  const defaultProps = {
    options: [{ value: 1, lable: 'Power' }, { value: 2, lable: 'Dark' }],
    className: 'type-checkbox',
    web: 'web',
    align: 'vertical',
    name: 'secondary_careers'
  }

  it('renders with empty props', () => {
    const component = shallow(<CheckboxGroup />)

    expect(component).toMatchSnapshot()
  })

  it('renders with props', () => {
    const component = shallow(<CheckboxGroup {...defaultProps} />)

    expect(component).toMatchSnapshot()
  })
})
