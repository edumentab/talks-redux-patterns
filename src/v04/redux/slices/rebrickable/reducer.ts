import { RebrickableState } from './types/state'
import { AppAction } from '../../types/appAction'
import { RebrickableActionNames } from './types/actionNames'
import { initialRebrickableState } from './initialState'
import produce from 'immer'

export const rebrickableReducer = (
  state: RebrickableState = initialRebrickableState,
  action: AppAction
): RebrickableState => {
  switch (action.type) {
    case RebrickableActionNames.LOAD_THEMES_INIT:
      return produce(state, draft => {
        draft.themes = {
          error: null,
          loading: true,
          data: null
        }
      })
    case RebrickableActionNames.LOAD_THEMES_ERROR: {
      const { error } = action.payload
      return produce(state, draft => {
        draft.themes.loading = false
        draft.themes.error = error
      })
    }
    case RebrickableActionNames.LOAD_THEMES_SUCCESS: {
      const { data } = action.payload
      return produce(state, draft => {
        draft.themes.loading = false
        draft.themes.data = data
      })
    }
    case RebrickableActionNames.LOAD_SETS_INIT: {
      const { themeId } = action.payload
      return produce(state, draft => {
        draft.themes.data![themeId].sets = {
          loading: true,
          error: null,
          data: null
        }
      })
    }
    case RebrickableActionNames.LOAD_SETS_ERROR: {
      const { themeId, error } = action.payload
      return produce(state, draft => {
        draft.themes.data![themeId].sets.loading = false
        draft.themes.data![themeId].sets.error = error
      })
    }
    case RebrickableActionNames.LOAD_SETS_SUCCESS: {
      const { data, themeId } = action.payload
      return produce(state, draft => {
        draft.themes.data![themeId].sets.loading = false
        draft.themes.data![themeId].sets.data = data
      })
    }
    default:
      return state
  }
}
