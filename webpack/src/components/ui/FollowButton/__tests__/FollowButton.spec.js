import React from 'react'
import { shallowWithIntl } from 'helpers/intl-enzyme'
import FollowButton from 'components/ui/FollowButton'

describe('<FollowButton />', () => {
  let props = {
    onFollow: jest.fn(),
    followed: true,
    followersCount: 77
  }

  it('renders followed button', () => {
    const component = shallowWithIntl(
      <FollowButton {...props} />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders unfollowed button', () => {
    props = {
      ...props,
      followed: false
    }

    const component = shallowWithIntl(
      <FollowButton {...props} />
    )

    expect(component).toMatchSnapshot()
  })
})
