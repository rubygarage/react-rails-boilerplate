import { FACEBOOK } from 'constants/actions'

const settings = 'location=no,scrollbars=no,toolbar=no,status=no,titlebar=no,directories=no,menubar=no'

const getPopupOffset = ({ width, height }) => {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX
  const wTop = window.screenTop ? window.screenTop : window.screenY

  const left = wLeft + (window.innerWidth / 2) - (width / 2)
  const top = wTop + (window.innerHeight / 2) - (height / 2)

  return { top, left }
}

const getPopupSize = (provider) => {
  switch (provider) {
    case FACEBOOK.toLowerCase():
      return { width: 580, height: 400 }

    default:
      return { width: 1020, height: 618 }
  }
}

const getPopupDimensions = (provider) => {
  const { width, height } = getPopupSize(provider)
  const { top, left } = getPopupOffset({ width, height })

  return `width=${width},height=${height},top=${top},left=${left}`
}

export const openPopup = (url, provider) => {
  const popup = window.open(url, 'Authentication', `${settings},${getPopupDimensions(provider)}`)

  return listenForPopup(popup)
}

const listenForPopup = (popup) => new Promise((resolve, reject) => {
  const listen = () => {
    if (popup.closed && localStorage.userData) {
      return resolve()
    }
    if (popup.closed && !localStorage.userData) {
      return reject(new Error('popup closed'))
    }

    window.setTimeout(listen, 0)

    return null
  }
  listen()
})

export const removePopupData = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('tokenInfo')
  localStorage.removeItem('newUser')
}
