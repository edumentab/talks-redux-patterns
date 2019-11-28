/* REFAC|EDITCOMMENT
The <span data-file-link="./lib/factory"><code>Factory</code></span> will now make <span data-file-link="./lib/types/creator"><code>Creators</code></span> pass <span data-file-link="./lib/types/consequence"><code>Consequences</code></span> directly into the <span data-file-link="./lib/types/action"><code>Actions</code></span>, so we can add a default `consGetter` that simply looks for those!

This lets us clean up `makeProdStore` which no longer needs to import all the <span data-file-link="./lib/types/consequence"><code>Consequences</code></span> in the app. Also, those no longer need to filter for being the current action (see the removed `if` in for example <span data-file-link="./slices/rebrickable/actions/loadSetsInit"><code>loadSetsInit</code></span>).

Finally we add support for an `initCons`, to be executed when the app starts. This means we can move the responsibility of executing the <span data-file-link="./slices/rebrickable/actions/loadThemesInit"><code>loadThemesInit</code></span> `Consequence` from the <span data-file-link="../app/Main.tsx"><code>Main</code></span> components into `makeProdStore`.
*/

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
  const {
    initialState,
    enhancers = [],
    deps,
    consGetter = (({ action }) =>
      action.cons ? [action.cons] : []) as AppConsGetter,
    initCons
  } = opts
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
  return makeStore({
    deps: { rebrickable: rebrickableService },
    initCons: ({ dispatch }) => dispatch(loadThemesInit())
  })
}
