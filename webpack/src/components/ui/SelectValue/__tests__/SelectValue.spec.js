import React from 'react'
import { shallow } from 'enzyme'
import SelectValue from 'components/ui/SelectValue'

describe('<SelectValue />', () => {
  const defaultProps = {
    value: { label: 'Audio', icon: 'icon-audio-circle' }
  }

  it('renders select value with icon', () => {
    const component = shallow(
      <SelectValue {...defaultProps} />
    )

    expect(component).toMatchSnapshot()
  })
})
