import { UIState } from './types'
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
      const { setId } = action.payload
      draft.currentSetId = setId
      return
    }
    if (isSetCurrentTheme(action)) {
      const { themeId } = action.payload
      draft.currentThemeId = themeId
      draft.currentSetId = null
      return
    }
  })
