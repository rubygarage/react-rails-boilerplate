import parseJsonApiErrors from 'utils/validation'

const errors = [
  {
    source: { pointer: '/data/attributes/password' },
    detail: 'can not be blank',
  },
  {
    source: { pointer: '/data/attributes/username' },
    detail: 'can not be lesser than 3 characters',
  },
];

const fields = ['password'];

describe('parseJsonApiErrors()', () => {
  it('return empty object if given no errors', () => {
    expect(parseJsonApiErrors([], [])).toEqual({});
  });

  it('return empty object if have no errors for given fields', () => {
    expect(parseJsonApiErrors(errors, ['no-error'])).toEqual({});
  });

  it('return only errors for given fields', () => {
    expect(parseJsonApiErrors(errors, fields)).toEqual({ password: 'can not be blank' });
  });

  it('return errors for several fields', () => {
    expect(parseJsonApiErrors(errors, ['password', 'username']))
      .toEqual({
        password: 'can not be blank',
        username: 'can not be lesser than 3 characters',
      });
  });
});
