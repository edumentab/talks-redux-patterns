import { UIActionNames, UIState } from './types'
import { AppAction } from '../../types/appAction'
import { initialUIState } from './initialState'
import produce from 'immer'

export const UIReducer = (
  state: UIState = initialUIState,
  action: AppAction
): UIState =>
  produce(state, draft => {
    switch (action.type) {
      case UIActionNames.SET_CURRENT_SET: {
        draft.currentSetId = action.payload
        return
      }
      case UIActionNames.SET_CURRENT_THEME: {
        draft.currentThemeId = action.payload
        draft.currentSetId = null
        return
      }
    }
  })
