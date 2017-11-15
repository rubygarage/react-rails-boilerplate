import React from 'react'
import { shallowWithIntl } from '../intl-enzyme'

describe('Intl-Exyme helper', () => {
  it('shallowWithIntl()', () => {
    const clonedComponent = shallowWithIntl(<div />)

    expect(clonedComponent.props()).toHaveProperty('intl')
  })
})
