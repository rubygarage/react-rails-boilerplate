import React from 'react'
import { hydrate } from 'react-dom'
import Root from 'containers/Root/Root'
import rootSaga from './sagas'
import configureStore from './store/configureStore'

function renderClient() {
  // window.__data = initial state passed down by server to client
  let initialState = window.__data // eslint-disable-line

  const dest = document.getElementById('root')
  const store = configureStore(initialState)
  store.runSaga(rootSaga)
  window.store = store

  hydrate(
    <Root store={store} />, dest
  )
}

renderClient()
