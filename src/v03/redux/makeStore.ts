import { createStore, compose, StoreEnhancer } from 'redux'
import { initialAppState } from './initialAppState'
import { rootReducer } from './rootReducer'
import { AppState, AppStore } from './types'

export type MakeStoreOpts = {
  initialState?: AppState
  enhancers?: StoreEnhancer[]
}

export const makeStore = (opts: MakeStoreOpts = {}): AppStore => {
  const { initialState, enhancers = [] } = opts

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
