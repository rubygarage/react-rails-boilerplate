import React from 'react'
import { shallow } from 'enzyme'
import PlaceholderWithIcon from 'components/ui/PlaceholderWithIcon'

describe('<PlaceholderWithIcon />', () => {
  const defaultProps = {
    className: 'mr-10',
    iconName: 'icon-audio-circle',
    text: 'Select...'
  }

  it('renders placeholder with icon', () => {
    const component = shallow(
      <PlaceholderWithIcon {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })
})
