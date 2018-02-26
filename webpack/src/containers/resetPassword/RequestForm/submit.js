import parseJsonApiErrors from 'utils/validation';
import { SubmissionError } from 'redux-form';
import { SEND_RESTORE_PASSWORD_EMAIL, REQUEST } from 'constants/actions';

const submit = (values, dispatch, props) => new Promise((resolve, reject) => {
  if (values) {
    dispatch({
      type: SEND_RESTORE_PASSWORD_EMAIL + REQUEST, values, resolve, reject,
    });
  } else {
    reject(Error("can't be blank"));
  }
})
  .then(() => {
    props.setResetRequestSubmitted(true);
  })
  .catch((response) => {
    const errors = response instanceof Error
      ? { email: response.message }
      : parseJsonApiErrors(response.errors, props.fieldsForValidation);
    throw new SubmissionError(errors);
  });

export default submit;
