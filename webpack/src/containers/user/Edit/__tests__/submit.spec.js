import submit from '../submit';

describe('submit', () => {
  const values = {
    someField: 'fieldValue',
    avatar: [
      'file',
    ],
  };
  let dispatch = jest.fn();
  let props = {};

  it('dispatches UDATE_USER_REQUEST', () => {
    submit(values, dispatch, props);
    expect(dispatch).toHaveBeenCalled();
  });

  it('rearranges form values to match avatar uploader on backend', () => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      key === 'avatar'
        ? formData.append('avatar[image]', values[key][0])
        : formData.append(key, values[key]);
    });

    submit(values, dispatch, props);
    expect(dispatch.mock.calls[1][0].values).toEqual(formData);
  });

  it('returns SubmissionError if server responded error', () => {
    props = { fieldsForValidation: ['someField'] };
    dispatch = jest.fn((args) => {
      args.reject({
        errors: [{
          source: { pointer: '/data/attributes/someField' },
          detail: 'can not be blank',
        }],
      });
    });

    submit(values, dispatch, props).catch((response) => {
      expect(response).toEqual({ errors: { someField: 'can not be blank' } });
    });
  });
});
