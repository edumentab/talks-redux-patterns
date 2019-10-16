import { createStore, compose } from 'redux'
import { initialAppState } from './initialAppState'

import { rootReducer } from './rootReducer'
import { AppState, AppAction, AppStore } from './types'

export type MakeStoreOpts = {
  initialState?: AppState
  actionProcessor?: (a: AppAction) => AppAction
}

export const makeStore = (opts: MakeStoreOpts = {}) => {
  const { initialState, actionProcessor } = opts
  const enhancers = []

  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  const store = createStore(
    rootReducer,
    initialState || initialAppState,
    compose(...enhancers)
  )

  return {
    ...store,
    dispatch: (a: AppAction) =>
      store.dispatch(actionProcessor ? actionProcessor(a) : a)
  } as AppStore
}
