import React from 'react'
import { shallow } from 'enzyme'
import User from 'components/user/Show'

describe('Show user', () => {

  it('get info at the page', () => {
    const props = {
    user: { 
      username: 'Boiler', 
      email: 'example@boiler.com'
     }
    }
    const component = shallow(
      <User {...props} />
    )

    expect(component).toMatchSnapshot()
  })

  it('empty info at the page', () => {
    const props = { user: {}}
    const component = shallow(<User {...props} />)

    expect(component).toMatchSnapshot()
  })

})
