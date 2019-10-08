import { UIActionNames, UIState } from './types'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState => {
  switch (action.type) {
    case UIActionNames.SET_CURRENT_SET: {
      return {
        ...state,
        currentSetId: action.payload
      }
    }
    case UIActionNames.SET_CURRENT_THEME: {
      return {
        ...state,
        currentThemeId: action.payload,
        currentSetId: null
      }
    }
    default:
      return state
  }
}
