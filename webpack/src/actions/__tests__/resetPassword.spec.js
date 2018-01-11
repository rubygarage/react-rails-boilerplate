import sendRestorePasswordEmail from 'actions/resetPassword';

describe('resetPassword', () => {
  it('creates an action to SEND_RESTORE_PASSWORD_EMAIL_REQUEST', () => {
    const values = {
      values: {},
      resolve: jest.fn(),
      reject: jest.fn(),
    };
    const expectedAction = { type: 'SEND_RESTORE_PASSWORD_EMAIL_REQUEST', ...values };

    expect(sendRestorePasswordEmail({}, values.resolve, values.reject)).toEqual(expectedAction);
  });
});
