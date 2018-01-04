import React from 'react'
import { shallow } from 'enzyme'
import Confirmation from 'components/Confirmation'

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
})
