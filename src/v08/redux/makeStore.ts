/* REFAC|EDITCOMMENT
We replace the old <span data-file-link="./lib/thunk">thunk middleware</span> for a <span data-file-link="./lib/consequence">consequence middleware</span>, and add a `consGetter` to our options to pass on to the consequence middleware.

For the production store we pass in a `consGetter` returning all the consequence definitions in our app (<span data-file-link="./slices/rebrickable/actions/loadSetsInit.consequence"><code>loadSetsInit</code></span> and <span data-file-link="./slices/rebrickable/actions/loadThemesInit.consequence"><code>loadThemesInit</code></span>.
*/

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
