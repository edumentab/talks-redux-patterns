import { UIState } from './types'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'
import produce from 'immer'
import { isSetCurrentSet, isSetCurrentTheme } from './actions'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState => {
  if (isSetCurrentSet(action)) {
    const { setId } = action.payload
    return produce(state, draft => {
      draft.currentSetId = setId
    })
  }
  if (isSetCurrentTheme(action)) {
    const { themeId } = action.payload
    return produce(state, draft => {
      draft.currentThemeId = themeId
      draft.currentSetId = null
    })
  }
  return state
}
