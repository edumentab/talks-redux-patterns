/* REFAC|EDITCOMMENT
The `makeStore` function can now take <span data-file-link="../redux/types/appDeps">AppDeps</span>, which the <span data-file-link="./lib/thunk"><code>thunk</code></span> middleware will supply to our <span data-file-link="./types/appThunk">AppThunks</span> (<span data-file-link="./slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span> and <span data-file-link="./slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>).

We also provide a `makeProdStore` function which adds the standard dependencies. The toplevel <span data-file-link="../app/App"><code>App</code></span> component will now use this instead of `makeStore`.
*/

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
