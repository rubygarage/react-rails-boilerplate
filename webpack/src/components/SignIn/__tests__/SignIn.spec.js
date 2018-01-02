import React from 'react'
import { shallow } from 'enzyme'
import { SignIn } from 'components/SignIn'

describe('<SigniIn />', () => {
  let props = {
    handleSubmit: jest.fn(),
    submitHandler: jest.fn(),
    intl: { formatMessage: jest.fn() }
  }

  it('renders sign in form and submitting button is false', () => {
    props = {
      ...props,
      submitting: false
    }
    const component = shallow(
      <SignIn {...props} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders sign in form and pristine is true', () => {
    props = {
      ...props,
      pristine: true
    }

    const component = shallow(
      <SignIn {...props} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders sign in form and submitting is true', () => {
    props = {
      ...props,
      submitting: true
    }

    const component = shallow(
      <SignIn {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})