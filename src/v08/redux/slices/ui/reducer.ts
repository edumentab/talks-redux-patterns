import { UIState } from './types/state'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'
import produce from 'immer'
import { isSetCurrentSet, isSetCurrentTheme } from './actions'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState =>
  produce(state, draft => {
    if (isSetCurrentSet(action)) {
      draft.currentSetId = action.payload
      return
    }
    if (isSetCurrentTheme(action)) {
      draft.currentThemeId = action.payload
      draft.currentSetId = null
      return
    }
  })
