import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux'
import { initialAppState } from './initialAppState'
import createThunkMiddleware from './lib/thunk'
import { rootReducer } from './rootReducer'
import { AppState, AppStore } from './types'

export type MakeStoreOpts = {
  initialState?: AppState
  enhancers?: StoreEnhancer[]
}

export const makeStore = (opts: MakeStoreOpts = {}): AppStore => {
  const { initialState, enhancers = [] } = opts
  const middlewares = [createThunkMiddleware]

  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.unshift(devToolsExtension())
  }

  enhancers.unshift(applyMiddleware(...middlewares))

  return createStore(
    rootReducer,
    initialState || initialAppState,
    compose(...enhancers)
  )
}
