import { createStore, compose, applyMiddleware } from 'redux'
import { initialAppState } from './initialAppState'
import createActionLogMiddleware from './lib/actionLog'
import { rootReducer } from './rootReducer'
import { AppState, AppAction, AppConsGetter, AppCons } from './types'
import { rebrickableService } from '../services'
import { createConsequenceMiddleware } from './lib/consequence'
import { loadThemesInit } from './slices/rebrickable/actions'

type MakeStoreOpts = {
  initialState?: AppState
  actionLog?: AppAction[]
  deps?: any
  consGetter?: AppConsGetter
  initCons?: AppCons
}

export const makeStore = (opts: MakeStoreOpts = {}) => {
  const { initialState, actionLog, deps, consGetter, initCons } = opts
  const middlewares = []
  if (consGetter) {
    middlewares.push(createConsequenceMiddleware(consGetter, deps))
  }
  if (actionLog) {
    middlewares.push(createActionLogMiddleware(actionLog))
  }

  const enhancers = [applyMiddleware(...middlewares)]

  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  const store = createStore(
    rootReducer,
    initialState || initialAppState,
    compose(...enhancers)
  )

  if (initCons) {
    store.dispatch({
      type: '__APPINIT__',
      payload: undefined,
      reducer: s => s,
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
