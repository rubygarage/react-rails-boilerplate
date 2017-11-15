import React from 'react'
import { shallow } from 'enzyme'
import SelectOption from 'components/ui/SelectOption'

describe('<SelectOption />', () => {
  const defaultProps = {
    option: { title: 'Audio', icon: 'icon-audio-circle' }
  }

  it('renders select option with icon', () => {
    const component = shallow(
      <SelectOption {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })
})
