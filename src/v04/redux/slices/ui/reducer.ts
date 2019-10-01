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
        const { setId } = action.payload
        draft.currentSetId = setId
        return
      }
      case UIActionNames.SET_CURRENT_THEME: {
        const { themeId } = action.payload
        draft.currentThemeId = themeId
        draft.currentSetId = null
        return
      }
    }
  })
