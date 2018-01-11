import ApiClient from 'utils/apiClient'
import { call, put } from 'redux-saga/effects'
import { FILE_UPLOAD, SUCCESS, ERROR } from 'constants/actions'

export function* fileUpload({ file }) {
  const apiClient = new ApiClient().buildClient()

  try {
    yield call(apiClient.post, '/api/v1/fileupload', { file })
    yield put({ type: FILE_UPLOAD + SUCCESS })
  } catch (error) {
    yield put({ type: FILE_UPLOAD + ERROR })
  }
}
