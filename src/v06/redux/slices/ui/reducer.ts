import { UIActionNames, UIState } from './types'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'
import produce from 'immer'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState => {
  switch (action.type) {
    case UIActionNames.SET_CURRENT_SET: {
      const { setId } = action.payload
      return produce(state, draft => {
        draft.currentSetId = setId
      })
    }
    case UIActionNames.SET_CURRENT_THEME: {
      const { themeId } = action.payload
      return produce(state, draft => {
        draft.currentThemeId = themeId
        draft.currentSetId = null
      })
    }
    default:
      return state
  }
}
