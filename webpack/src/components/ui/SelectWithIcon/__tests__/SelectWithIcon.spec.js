import React from 'react'
import { shallow } from 'enzyme'
import SelectWithIcon from 'components/ui/SelectWithIcon'

describe('<SelectWithIcon />', () => {
  const defaultProps = {
    value: 'Cardable::AudioCard',
    options: [
      { value: 'Cardable::AudioCard', label: 'Audio', icon: 'icon-audio-circle' },
      { value: 'Cardable::VideoCard', label: 'Video', icon: 'icon-play-circle' }
    ],
    placeholder: 'Select card type'
  }

  it('renders select with icon', () => {
    const component = shallow(
      <SelectWithIcon {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })
})
