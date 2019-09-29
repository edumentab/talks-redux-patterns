import { createStore, compose, applyMiddleware } from 'redux'
import { initialAppState } from './initialAppState'
import createThunkMiddleware from './lib/thunk'
import createActionLogMiddleware from './lib/actionLog'
import { rootReducer } from './rootReducer'
import { AppState, AppAction } from './types'
import { AppThunk } from './lib/types/thunk'

type MakeStoreOpts = {
  initialState?: AppState
  actionLog?: AppAction[]
  deps?: any
}

export const makeStore = (opts: MakeStoreOpts = {}) => {
  const { initialState, actionLog, deps } = opts
  const middlewares = [
    (createThunkMiddleware as typeof createThunkMiddleware & {
      withExtraArgument: typeof createThunkMiddleware
    }).withExtraArgument(deps)
  ]
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

  return store as {
    getState: () => AppState
    dispatch: (a: AppAction | AppThunk) => void
  }
}
