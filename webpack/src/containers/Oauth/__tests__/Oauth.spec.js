import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import OauthContainer, { Oauth } from 'containers/auth/Oauth'

describe('<Oauth />', () => {
  const defaultProps = {
    color: 'blue-dark',
    oauthRequest: jest.fn(),
    provider: 'facebook',
    type: 'icon-fb'
  }

  it('handleOauthRequest()', () => {
    const component = shallow(<Oauth {...defaultProps} />)
    const event = { preventDefault: jest.fn() }
    component.instance().handleOauthRequest(event)

    expect(defaultProps.oauthRequest).toHaveBeenCalledWith(defaultProps.provider)
  })

  it('renders oauth link', () => {
    const component = shallow(<Oauth {...defaultProps} />)

    expect(component).toMatchSnapshot()
  })

  it('renders oauth button', () => {
    const props = {
      ...defaultProps,
      button: true
    }
    const component = shallow(<Oauth {...props} />)

    expect(component).toMatchSnapshot()
  })

  it('maps dispatch to props', () => {
    const store = configureStore()({})
    const container = shallow(<OauthContainer store={store} {...defaultProps} />)

    expect(container.props()).toEqual(expect.objectContaining({
      oauthRequest: expect.any(Function)
    }))
  })
})
