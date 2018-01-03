import React from 'react'
import { shallow } from 'enzyme'
import Instruction from 'components/resetPassword/RequestForm/Instructions'

describe('<Instruction />', () => {

  it('renders Instruction component', () => {
    
    const component = shallow(
      <Instruction />
    )

    expect(component).toMatchSnapshot()
  })
})
