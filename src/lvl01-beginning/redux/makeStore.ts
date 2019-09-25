import { createStore } from 'redux'
import { initialAppState } from './initialAppState'

import { rootReducer } from './rootReducer'
import { AppState } from './types'

type MakeStoreOpts = {
  initialState?: AppState
}

export const makeStore = ({ initialState }: MakeStoreOpts) =>
  createStore(rootReducer, initialState || initialAppState)
