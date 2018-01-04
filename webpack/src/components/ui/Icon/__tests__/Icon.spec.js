import React from 'react'
import { shallow } from 'enzyme'
import Icon from 'components/ui/Icon'

describe('<Icon />', () => {
  const props = {
    type: 'arrows',
    className: 'TestClass',
    onClick: jest.fn()
  }

  it('renders with empty props', () => {
    const component = shallow(
      <Icon />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders with props', () => {
    const component = shallow(
      <Icon {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
