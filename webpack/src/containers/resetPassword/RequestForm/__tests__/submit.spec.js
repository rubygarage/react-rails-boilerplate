import submit from '../submit';

describe('submit', () => {
  const props = {
    setResetRequestSubmitted: jest.fn(),
    fieldsForValidation: ['email'],
  };

  it('dispatches SEND_RESTORE_PASSWORD_EMAIL and throw SubmissionError with errors', () => {
    const values = { email: 'invalid_email' };
    const dispatch = jest.fn((args) => {
      args.reject({
        errors: [{
          source: { pointer: '/data/attributes/email' },
          detail: 'should be a valid e-mail',
        }],
      });
    });

    submit(values, dispatch, props).catch((response) => {
      expect(response).toEqual({ errors: { email: 'should be a valid e-mail' } });
    });
    expect(dispatch).toHaveBeenCalled();
  });

  it('dispatches SEND_RESTORE_PASSWORD_EMAIL and calls setResetRequestSubmitted', () => {
    const values = { email: 'email@example.com' };
    const dispatch = jest.fn((args) => { args.resolve(); });

    submit(values, dispatch, props).then(() => {
      expect(props.setResetRequestSubmitted.mock.calls[0][0]).toBe(true);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  it('rejects promise and throw SubmissionError if values is undefined', () => {
    const values = undefined;
    const dispatch = jest.fn();

    submit(values, dispatch, props).catch((response) => {
      expect(response).toEqual({ errors: { email: "can't be blank" } });
    });
  });
});
