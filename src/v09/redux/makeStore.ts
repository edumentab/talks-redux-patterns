import { createStore, compose, applyMiddleware } from 'redux'
import { initialAppState } from './initialAppState'
import createActionLogMiddleware from './lib/actionLog'
import { rootReducer } from './rootReducer'
import { AppState, AppAction, AppConsGetter, AppCons } from './types'
import { rebrickableService } from '../services'
import { createConsequenceMiddleware } from './lib/consequence'
import {
  loadSetsInitConsequence,
  loadThemesInitConsequence
} from './slices/rebrickable/actions'

type MakeStoreOpts = {
  initialState?: AppState
  actionLog?: AppAction[]
  deps?: any
  consGetter?: AppConsGetter
}

export const makeStore = (opts: MakeStoreOpts = {}) => {
  const { initialState, actionLog, deps, consGetter } = opts
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

  return store
}

export const makeProdStore = () => {
  const appConsequences: AppCons[] = [
    loadSetsInitConsequence,
    loadThemesInitConsequence
  ]
  const consGetter: AppConsGetter = () => appConsequences
  return makeStore({ deps: { rebrickable: rebrickableService }, consGetter })
}
