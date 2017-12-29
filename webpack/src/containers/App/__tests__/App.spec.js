import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AppContainer, { App } from 'containers/App'
import { shallow } from 'enzyme'

describe('App containers', () => {
  let AppComponent
  let Component
  beforeEach(() => {
    const component = shallow(
      <Provider>
        <AppContainer />
      </Provider>
    )

    Component = component.find(AppContainer)
  })

  it('should render', () => {

    expect(Component.length).toBeTruthy()
  })
})
