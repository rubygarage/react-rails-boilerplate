import React from 'react'
import { shallow } from 'enzyme'
import StepWithText from 'components/ui/StepsWithText/StepWithText'

describe('<StepWithText />', () => {
  const defaultProps = {
    active: true,
    passed: false,
    text: 'text'
  }

  it('renders active step', () => {
    const component = shallow(
      <StepWithText {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders passed step', () => {
    const props = {
      ...defaultProps,
      active: false,
      passed: true
    }

    const component = shallow(
      <StepWithText {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
