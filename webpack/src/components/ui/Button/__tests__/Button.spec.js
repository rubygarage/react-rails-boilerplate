import React from 'react'
import { shallow } from 'enzyme'
import Button from 'components/ui/Button'

describe('<Button />', () => {
  it('renders Button', () => {
    const component = shallow(<Button />)

    expect(component).toMatchSnapshot()
  })

  it('renders A', () => {
    const component = shallow(<Button href="/" />)

    expect(component).toMatchSnapshot()
  })

  it('renders Link', () => {
    const component = shallow(<Button to="/" />)

    expect(component).toMatchSnapshot()
  })
})
