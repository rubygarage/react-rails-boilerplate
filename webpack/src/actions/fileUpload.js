import { FILE_UPLOAD, REQUEST } from 'constants/actions'

export function fileUpload(values, resolve, reject) {
  return { type: FILE_UPLOAD + REQUEST, values, resolve, reject }
}
