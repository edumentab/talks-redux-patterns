import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux'
import { initialAppState } from './initialAppState'
import createThunkMiddleware from './lib/thunk'
import { rootReducer } from './rootReducer'
import { AppState, AppStore, AppDeps } from './types'
import { rebrickableService } from '../services'

export type MakeStoreOpts = {
  initialState?: AppState
  enhancers?: StoreEnhancer[]
  deps?: AppDeps
}

export const makeStore = (opts: MakeStoreOpts = {}): AppStore => {
  const { initialState, enhancers = [], deps } = opts
  const middlewares = [
    (createThunkMiddleware as typeof createThunkMiddleware & {
      withExtraArgument: any
    }).withExtraArgument(deps)
  ]

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

export const makeProdStore = () =>
  makeStore({ deps: { rebrickable: rebrickableService } })
