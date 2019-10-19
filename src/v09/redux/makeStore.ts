import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux'
import { initialAppState } from './initialAppState'
import { rootReducer } from './rootReducer'
import { AppState, AppStore, AppConsGetter, AppCons } from './types'
import { rebrickableService } from '../services'
import { createConsequenceMiddleware } from './lib/consequence'
import {
  loadSetsInitConsequence,
  loadThemesInitConsequence
} from './slices/rebrickable/actions'

export type MakeStoreOpts = {
  initialState?: AppState
  enhancers?: StoreEnhancer[]
  deps?: any
  consGetter?: AppConsGetter
}

export const makeStore = (opts: MakeStoreOpts = {}): AppStore => {
  const { initialState, enhancers = [], deps, consGetter } = opts
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
