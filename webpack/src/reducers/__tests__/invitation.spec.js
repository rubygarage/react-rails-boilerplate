import invitation from 'reducers/invitation'

describe('Invitations reducer', () => {
  it('has an initial state', () => {
    expect(invitation(undefined, { type: 'unexpected' })).toEqual({
      loading: false,
      invitation: {},
      allowedRolesIds: []
    })
  })

  it('can handle GET_INVITATION_DATA_REQUEST', () => {
    expect(invitation(undefined, { type: 'GET_INVITATION_DATA_REQUEST' })).toEqual({
      loading: true,
      invitation: {},
      allowedRolesIds: []
    })
  })

  it('can handle GET_INVITATION_DATA_SUCCESS', () => {
    const response = { id: 1 }

    expect(invitation(undefined, { type: 'GET_INVITATION_DATA_SUCCESS', response })).toEqual({
      loading: false,
      invitation: { id: 1 },
      allowedRolesIds: []
    })
  })

  it('can handle GET_INVITATION_DATA_ERROR', () => {
    expect(invitation(undefined, { type: 'GET_INVITATION_DATA_ERROR' })).toEqual({
      loading: false,
      invitation: {},
      allowedRolesIds: []
    })
  })

  it('can handle CREATE_INVITATION_SUCCESS', () => {
    expect(invitation(undefined, { type: 'CREATE_INVITATION_SUCCESS' })).toEqual({
      loading: false,
      invitation: {},
      allowedRolesIds: []
    })
  })

  it('can handle GET_ALLOWED_INVITATION_ROLES_SUCCESS', () => {
    const results = {
      roles: [1, 2]
    }

    expect(invitation(undefined, { type: 'GET_ALLOWED_INVITATION_ROLES_SUCCESS', results })).toEqual({
      loading: false,
      invitation: {},
      allowedRolesIds: [1, 2]
    })
  })
})
