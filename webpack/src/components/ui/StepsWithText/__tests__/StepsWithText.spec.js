import React from 'react'
import { shallow } from 'enzyme'
import StepsWithText from 'components/ui/StepsWithText'

describe('<StepsWithText />', () => {
  const defaultProps = {
    steps: ['Invitation', 'Additional info', 'Membership'],
    step: 2
  }

  it('renders second step as active', () => {
    const component = shallow(
      <StepsWithText {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })
})
