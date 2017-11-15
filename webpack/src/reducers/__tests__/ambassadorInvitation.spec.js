import ambassadorInvitation from 'reducers/ambassadorInvitation'

describe('Ambassador Invitation reducer', () => {
  it('has an initial state', () => {
    expect(ambassadorInvitation(undefined, { type: 'unexpected' })).toEqual({
      loading: false,
      inviteeUsername: null,
      invitationInvalid: false
    })
  })

  it('can handle GET_INVITEE_DATA_REQUEST', () => {
    expect(ambassadorInvitation(undefined, { type: 'GET_INVITEE_DATA_REQUEST' })).toEqual({
      loading: true,
      inviteeUsername: null,
      invitationInvalid: false
    })
  })

  it('can handle GET_INVITEE_DATA_ERROR', () => {
    expect(ambassadorInvitation(undefined, { type: 'GET_INVITEE_DATA_ERROR' })).toEqual({
      loading: false,
      inviteeUsername: null,
      invitationInvalid: true
    })
  })

  it('can handle GET_INVITEE_DATA_SUCCESS', () => {
    const results = { inviteeUsername: 'vito' }

    expect(ambassadorInvitation(undefined, { type: 'GET_INVITEE_DATA_SUCCESS', ...results })).toEqual({
      loading: false,
      inviteeUsername: results.inviteeUsername,
      invitationInvalid: false
    })
  })
})
