import React from 'react'
import { shallow } from 'enzyme'
import { ResetPasswordRequestForm } from 'components/resetPassword/RequestForm'

describe('<ResetPasswordRequestForm />', () => {
  let props = {
    intl: { formatMessage: jest.fn() },
    handleSubmit: jest.fn(),
    submitHandler: jest.fn()
  }

  it('renders ResetPasswordRequestForm component', () => {
    
    const component = shallow(
      <ResetPasswordRequestForm {...props} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders with pristine = true', () => {
    props = {
      ...props,
      pristine: true
    }

    const component = shallow(
      <ResetPasswordRequestForm {...props} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders with submitting = true', () => {
    props = {
      ...props,
      submitting: true
    }

    const component = shallow(
      <ResetPasswordRequestForm {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
