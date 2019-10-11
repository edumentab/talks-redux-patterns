import { createStore, applyMiddleware, compose } from 'redux'
import {
  makeStore as makeConduxionProdStore,
  MakeStoreOptions,
  ConsequenceGetter,
  createConsequenceMiddleware,
  createActionLogMiddleware
} from 'conduxion'

import { rootReducer } from './rootReducer'
import { AppState, AppAction, AppDeps } from './types'
import { rebrickableService } from '../services'
import { loadThemesInit } from './slices/rebrickable/actions'
import { initialAppState } from './initialAppState'

type MakeDevStoreOps = MakeStoreOptions<AppState, AppDeps> & {
  actionLog?: string[]
}

// @todo
const actionLog: any[] = []

export const makeStore = (opts: MakeDevStoreOps = {}) => {
  const {
    additionalMiddleware = [],
    dependencies,
    initConsequence,
    consequenceGetter: theirGetter
  } = opts
  const middleware = [...additionalMiddleware]
  const consequenceGetter: ConsequenceGetter<AppState, AppDeps> = api => {
    if (theirGetter) {
      return theirGetter(api)
    }

    const { action } = api

    if (action.consequence) {
      return Array.isArray(action.consequence)
        ? action.consequence
        : [action.consequence]
    }

    return []
  }

  if (consequenceGetter) {
    middleware.push(
      createConsequenceMiddleware<AppState, AppDeps>(
        consequenceGetter,
        dependencies!
      )
    )
  }
  if (actionLog) {
    middleware.push(createActionLogMiddleware<AppAction>(actionLog))
  }

  const enhancers = [applyMiddleware(...middleware)]
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  const store = createStore(rootReducer, initialAppState, compose(...enhancers))

  if (initConsequence) {
    // @todo: fix typing
    const initAction: any = {
      type: '__APP_INIT__',
      consequence: initConsequence
    }

    store.dispatch(initAction)
  }

  return store
}

export const makeProdStore = () => {
  return makeConduxionProdStore<AppState, AppAction, AppDeps>(
    rootReducer,
    initialAppState,
    {
      dependencies: { rebrickable: rebrickableService },
      initConsequence: ({ dispatch }) => dispatch(loadThemesInit())
    }
  )
}
