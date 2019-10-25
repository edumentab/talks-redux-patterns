/* REFAC|EDITCOMMENT
For deeply nested state changes, applying Immer will make the most difference. Notice especially the case for `LOAD_SETS_SUCCESS`!
*/

import { RebrickableState } from './types/state'
import { AppAction } from '../../types/appAction'
import { RebrickableActionNames } from './types/actionNames'
import { initialRebrickableState } from './initialState'
import produce from 'immer'

export const rebrickableReducer = (
  state: RebrickableState = initialRebrickableState,
  action: AppAction
): RebrickableState =>
  produce(state, draft => {
    switch (action.type) {
      case RebrickableActionNames.LOAD_THEMES_INIT:
        draft.themes = {
          error: null,
          loading: true,
          data: null
        }
        return
      case RebrickableActionNames.LOAD_THEMES_ERROR: {
        const error = action.payload
        draft.themes.loading = false
        draft.themes.error = error
        return
      }
      case RebrickableActionNames.LOAD_THEMES_SUCCESS: {
        const data = action.payload
        draft.themes.loading = false
        draft.themes.data = data
        return
      }
      case RebrickableActionNames.LOAD_SETS_INIT: {
        const themeId = action.payload
        draft.themes.data![themeId].sets = {
          loading: true,
          error: null,
          data: null
        }
        return
      }
      case RebrickableActionNames.LOAD_SETS_ERROR: {
        const { themeId, error } = action.payload
        draft.themes.data![themeId].sets.loading = false
        draft.themes.data![themeId].sets.error = error
        return
      }
      case RebrickableActionNames.LOAD_SETS_SUCCESS: {
        const { data, themeId } = action.payload
        draft.themes.data![themeId].sets.loading = false
        draft.themes.data![themeId].sets.data = data
        return
      }
    }
  })
