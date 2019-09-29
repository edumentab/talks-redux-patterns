import { RebrickableState } from './types/state'
import { AppAction } from '../../types/appAction'
import { initialRebrickableState } from './initialState'
import produce from 'immer'
import {
  isLoadThemesInit,
  isLoadThemesError,
  isLoadThemesSuccess,
  isLoadSetsInit,
  isLoadSetsError,
  isLoadSetsSuccess
} from './actions'

export const rebrickableReducer = (
  state: RebrickableState = initialRebrickableState,
  action: AppAction
): RebrickableState => {
  if (isLoadThemesInit(action)) {
    return produce(state, draft => {
      draft.themes = {
        error: null,
        loading: true,
        data: null
      }
    })
  }
  if (isLoadThemesError(action)) {
    const { error } = action.payload
    return produce(state, draft => {
      draft.themes.loading = false
      draft.themes.error = error
    })
  }
  if (isLoadThemesSuccess(action)) {
    const { data } = action.payload
    return produce(state, draft => {
      draft.themes.loading = false
      draft.themes.data = data
    })
  }
  if (isLoadSetsInit(action)) {
    const { themeId } = action.payload
    return produce(state, draft => {
      draft.themes.data![themeId].sets = {
        loading: true,
        error: null,
        data: null
      }
    })
  }
  if (isLoadSetsError(action)) {
    const { themeId, error } = action.payload
    return produce(state, draft => {
      draft.themes.data![themeId].sets.loading = false
      draft.themes.data![themeId].sets.error = error
    })
  }
  if (isLoadSetsSuccess(action)) {
    const { data, themeId } = action.payload
    return produce(state, draft => {
      draft.themes.data![themeId].sets.loading = false
      draft.themes.data![themeId].sets.data = data
    })
  }
  return state
}
