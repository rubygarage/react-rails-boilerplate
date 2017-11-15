import React from 'react'
import { shallow } from 'enzyme'
import Checkbox from 'components/ui/Checkbox'

describe('<Checkbox />', () => {
  it('renders Checkbox', () => {
    const component = shallow(<Checkbox name="test" />)

    expect(component).toMatchSnapshot()
  })
})
