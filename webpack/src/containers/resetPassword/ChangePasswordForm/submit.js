import { parseJsonApiErrors } from 'utils/validation'
import { SubmissionError } from 'redux-form'
import { UPDATE_PASSWORD, REQUEST } from 'constants/actions'

const submit = (values, dispatch, props) => new Promise((resolve, reject) => {
  dispatch({ type: UPDATE_PASSWORD + REQUEST, values, resolve, reject })
}).catch((response) => {
  const errors = parseJsonApiErrors(response.errors, props.fieldsForValidation)
  throw new SubmissionError(errors)
})

export default submit
