import axios from 'axios'
import config from 'utils/config'
import Cookies from 'universal-cookie'
import { isServer } from 'helpers/server'

export default class ApiClient {
  buildClient(req) {
    const headers = this._buildHeaders(req)
    const client = this._buildAxiosInstance(headers)

    return client
  }

  // private
  _buildHeaders(req) {
    const authToken = req ? this._getAuthTokenFromServerRequest(req) : this._getHeadersFromClientCookies()
    const headers = authToken ? { authorization: authToken } : {}

    return headers
  }

  _getAuthTokenFromServerRequest(req) {
    const cookies = new Cookies(req.headers.cookie)

    return cookies.get('authToken')
  }

  _getHeadersFromClientCookies() {
    const cookies = new Cookies()

    return cookies.get('authToken')
  }

  _buildAxiosInstance(authHeaders) {
    const options = { headers: authHeaders }
    if (isServer()) { options.baseURL = config.apiBaseUrl }
    const client = axios.create(options)

    return client
  }
}
