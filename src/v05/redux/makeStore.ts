/* REFAC|EDITCOMMENT
We add the <span data-file-link="./lib/thunk"><code>thunk</code></span> middleware to our store, to allow our users to dispatch <span data-file-link="./types/appThunk"><code>AppThunk</code></span> as well as <span data-file-link="./types/appAction"><code>AppAction</code></span>.

This change is of course also reflected in the <span data-file-link="./types/appStore"><code>AppStore</code></span> type.

This also means that our store is no longer assignable to the basic Redux `Store` type, forcing us to do some ugly type casting elsewhere (this happens in <span data-file-link="../app/App.tsx"><code>App.tsx</code></span> and <span data-file-link="../testUtils/testRender"><code>testRender</code></span>).
*/

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
