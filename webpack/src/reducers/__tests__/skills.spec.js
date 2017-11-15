import skills from 'reducers/skills'

describe('Skills reducer', () => {
  it('has an initial state', () => {
    expect(skills(undefined, { type: 'unexpected' })).toEqual({
      list: [],
      loading: false
    })
  })

  it('can handle LOAD_SKILLS_REQUEST', () => {
    expect(skills(undefined, { type: 'LOAD_SKILLS_REQUEST' })).toEqual({
      list: [],
      loading: true
    })
  })

  it('can handle LOAD_SKILLS_SUCCESS', () => {
    const results = {
      skills: [1, 2, 3]
    }

    expect(skills(undefined, { type: 'LOAD_SKILLS_SUCCESS', results })).toEqual({
      list: [1, 2, 3],
      loading: false
    })
  })

  it('can handle LOAD_SKILLS_ERROR', () => {
    expect(skills(undefined, { type: 'LOAD_SKILLS_ERROR' })).toEqual({
      list: [],
      loading: false
    })
  })
})
