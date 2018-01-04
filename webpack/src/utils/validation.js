const parseJsonApiErrors = (errors = [], fields = []) => {
  let parsedErrors = errors;
  if (fields.length) {
    parsedErrors = parsedErrors.filter(e => fields.includes(e.source.pointer.split('/').pop(-1)));
  }

  return parsedErrors.reverse().reduce((previous, current) => (
    { ...previous, [current.source.pointer.split('/').pop(-1)]: current.detail }), {});
};

export default parseJsonApiErrors;
