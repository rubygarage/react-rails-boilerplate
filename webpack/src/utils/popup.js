import { FACEBOOK } from 'constants/actions';

const settings = 'location=no,scrollbars=no,toolbar=no,status=no,titlebar=no,directories=no,menubar=no';

const getPopupOffset = ({ width, height }) => {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;

  const left = (wLeft + (window.innerWidth / 2)) - (width / 2);
  const top = (wTop + (window.innerHeight / 2)) - (height / 2);

  return { top, left };
};

const getPopupSize = (provider) => {
  switch (provider) {
    case FACEBOOK.toLowerCase():
      return { width: 580, height: 400 };

    default:
      return { width: 1020, height: 618 };
  }
};

const getPopupDimensions = (provider) => {
  const { width, height } = getPopupSize(provider);
  const { top, left } = getPopupOffset({ width, height });

  return `width=${width},height=${height},top=${top},left=${left}`;
};

const listenForPopup = (popup, url) => new Promise((resolve, reject) => {
  const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  const eventer = window[eventMethod];
  const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

  eventer(messageEvent, (event) => {
    if (popup.closed && event.data.userData) {
      return resolve(event.data);
    } else if (popup.closed && !event.data.userData && event.origin.match(url)) {
      return reject(new Error('popup closed'));
    }
    return false;
  }, false);
});

export default (url, provider) => {
  const popup = window.open(url, 'Authentication', `${settings},${getPopupDimensions(provider)}`);

  return listenForPopup(popup, url);
};
