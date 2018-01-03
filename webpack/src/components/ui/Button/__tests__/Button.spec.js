import React from 'react'
import { shallow } from 'enzyme'
import Button from 'components/ui/Button'

describe('<Button />', () => {
  let props = {
    className: 'grey',
    disabled: true,
    onClick: jest.fn()
  }
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

  it('renders Button with props', () => {
    props = {
      ...props,
      type: 'button'
    }

    const component = shallow(<Button {...props} />)

    expect(component).toMatchSnapshot()
  })

  it('renders A with props', () => {
    props = {
      ...props,
      type: 'button',
      href: '/'
    }

    const component = shallow(<Button {...props} />)

    expect(component).toMatchSnapshot()
  })

  it('renders Link with props', () => {
    props = {
      ...props,
      type: 'button',
      to: '/'
    }

    const component = shallow(<Button {...props} />)

    expect(component).toMatchSnapshot()
  })
})
