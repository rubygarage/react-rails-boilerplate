import parseJsonApiErrors from 'utils/validation';
import { SubmissionError } from 'redux-form';
import { UPDATE_USER, REQUEST } from 'constants/actions';

const submit = (values, dispatch, props) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    key === 'avatar'
      ? formData.append('avatar[image]', values[key][0])
      : formData.append(key, values[key]);
  });

  return new Promise((resolve, reject) => {
    dispatch({
      type: UPDATE_USER + REQUEST, values: formData, id: props.id, resolve, reject,
    });
  }).catch((response) => {
    const errors = parseJsonApiErrors(response.errors, props.fieldsForValidation);
    throw new SubmissionError(errors);
  });
};

export default submit;
