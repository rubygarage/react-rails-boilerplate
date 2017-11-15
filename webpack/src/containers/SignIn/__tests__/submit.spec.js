import submit from '../submit'

describe('submit', () => {
  it('dispatches SIGN_IN_REQUEST and throw SubmissionError with errors', () => {
    const values = {}
    const props = { fieldsForValidation: ['password'] }
    const dispatch = jest.fn((args) => {
      args.reject({
        errors: [{
          source: { pointer: '/data/attributes/password' },
          detail: 'can not be blank'
        }]
      })
    })

    submit(values, dispatch, props).catch((response) => {
      expect(response).toEqual({ errors: { password: 'can not be blank' } })
    })

    expect(dispatch).toHaveBeenCalled()
  })
})
