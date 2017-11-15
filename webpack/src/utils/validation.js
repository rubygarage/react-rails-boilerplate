export const parseJsonApiErrors = (errors = [], fields = []) => {
  if (fields.length) {
    errors = errors.filter((e) => fields.includes(e.source.pointer.split('/').pop(-1)))
  }

  return errors.reverse().reduce((previous, current) => (
    { ...previous, [current.source.pointer.split('/').pop(-1)]: current.detail }), {}
  )
}
