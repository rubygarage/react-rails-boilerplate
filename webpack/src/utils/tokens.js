import Cookies from 'universal-cookie'
import { isClient } from 'helpers/server'

export const setTokenToStorage = (headers) => {
  const authToken = headers.authorization

  if (isClient()) {
    const cookies = new Cookies()
    cookies.set('authToken', authToken)
  }
}

export const deleteTokenFromStorage = () => {
  const cookies = new Cookies()
  cookies.remove('authToken')
}
