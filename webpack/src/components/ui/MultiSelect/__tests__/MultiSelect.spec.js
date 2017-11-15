import React from 'react'
import { shallow } from 'enzyme'
import MultiSelect from 'components/ui/MultiSelect'

describe('<MultiSelect />', () => {
  const defaultProps = {
    options: [{ value: 1, lable: 'Mood' }]
  }

  it('renders with empty props', () => {
    const component = shallow(<MultiSelect />)

    expect(component).toMatchSnapshot()
  })

  it('renders with props', () => {
    const component = shallow(<MultiSelect {...defaultProps} />)

    expect(component).toMatchSnapshot()
  })
})
