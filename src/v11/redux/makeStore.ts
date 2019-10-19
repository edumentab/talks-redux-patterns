import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux'
import { initialAppState } from './initialAppState'
import { rootReducer } from './rootReducer'
import { AppState, AppStore, AppConsGetter, AppCons } from './types'
import { rebrickableService } from '../services'
import { createConsequenceMiddleware } from './lib/consequence'
import { loadThemesInit } from './slices/rebrickable/actions'

export type MakeStoreOpts = {
  initialState?: AppState
  enhancers?: StoreEnhancer[]
  deps?: any
  consGetter?: AppConsGetter
  initCons?: AppCons
}

export const makeStore = (opts: MakeStoreOpts = {}): AppStore => {
  const { initialState, enhancers = [], deps, consGetter, initCons } = opts
  const middlewares = []
  if (consGetter) {
    middlewares.push(createConsequenceMiddleware(consGetter, deps))
  }

  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.unshift(devToolsExtension())
  }

  enhancers.unshift(applyMiddleware(...middlewares))

  const store = createStore(
    rootReducer,
    initialState || initialAppState,
    compose(...enhancers)
  )

  if (initCons) {
    store.dispatch({
      type: '__APPINIT__',
      payload: undefined,
      cons: initCons
    })
  }

  return store
}

export const makeProdStore = () => {
  const consGetter: AppConsGetter = ({ action }) =>
    action.cons ? [action.cons] : []

  return makeStore({
    deps: { rebrickable: rebrickableService },
    consGetter,
    initCons: ({ dispatch }) => dispatch(loadThemesInit())
  })
}
