import React from 'react'
import { shallow } from 'enzyme'
import Confirmation from 'components/auth/Confirmation'

describe('<Confirmation />', () => {
  const defaultProps = {
    loading: false
  }

  it('renders success message', () => {
    const component = shallow(
      <Confirmation {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders spinner', () => {
    const props = {
      ...defaultProps,
      loading: true
    }

    const component = shallow(
      <Confirmation {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
