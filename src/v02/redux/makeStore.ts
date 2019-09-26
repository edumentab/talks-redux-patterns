import { createStore, compose } from 'redux'
import { initialAppState } from './initialAppState'

import { rootReducer } from './rootReducer'
import { AppState } from './types'

type MakeStoreOpts = {
  initialState?: AppState
}

export const makeStore = ({ initialState }: MakeStoreOpts) => {
  const enhancers = []

  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  return createStore(
    rootReducer,
    initialState || initialAppState,
    compose(...enhancers)
  )
}
