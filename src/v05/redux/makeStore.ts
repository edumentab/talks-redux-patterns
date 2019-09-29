import { createStore, compose, applyMiddleware } from 'redux'
import { initialAppState } from './initialAppState'
import createThunkMiddleware from './lib/thunk'
import { rootReducer } from './rootReducer'
import { AppState } from './types'

type MakeStoreOpts = {
  initialState?: AppState
}

export const makeStore = (opts: MakeStoreOpts = {}) => {
  const { initialState } = opts
  const enhancers = [applyMiddleware(createThunkMiddleware)]

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
