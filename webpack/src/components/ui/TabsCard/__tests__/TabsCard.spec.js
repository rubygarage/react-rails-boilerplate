import React from 'react'
import { shallowWithIntl } from 'helpers/intl-enzyme'
import TabsCard from 'components/ui/TabsCard'

describe('<TabsCard />', () => {
  const props = {
    className: 'mb-15',
    children: []
  }

  it('renders tabs wraper', () => {
    const component = shallowWithIntl(
      <TabsCard {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
