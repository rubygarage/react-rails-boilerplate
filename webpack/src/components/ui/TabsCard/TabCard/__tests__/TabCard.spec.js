import React from 'react'
import { shallowWithIntl } from 'helpers/intl-enzyme'
import { TabCard } from 'components/ui/TabsCard/TabCard'

describe('<TabCard />', () => {
  const props = {
    color: 'grey',
    className: 'in-white',
    icon: 'icon-user-circle',
    iconClass: 'font-20',
    onClick: jest.fn(),
    text: 'some text',
    type: 'active'
  }

  it('renders tab with text', () => {
    const component = shallowWithIntl(
      <TabCard {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
