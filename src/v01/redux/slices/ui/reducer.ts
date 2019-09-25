import { UIActionNames, UIState } from './types'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState => {
  switch (action.type) {
    case UIActionNames.SET_CURRENT_SET: {
      const { setId } = action.payload
      return {
        ...state,
        currentSetId: setId
      }
    }
    case UIActionNames.SET_CURRENT_THEME: {
      const { themeId } = action.payload
      return {
        ...state,
        currentThemeId: themeId,
        currentSetId: null
      }
    }
    default:
      return state
  }
}
