// https://github.com/facebook/jest/issues/2098

export const localStorageMock = (function() {
  let store = {}

  return {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  }

})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})
