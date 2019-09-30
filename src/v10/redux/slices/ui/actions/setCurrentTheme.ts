import { AppActionMould } from '../../../types'
import { UIActionNames } from '../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type SetCurrentThemePayload = {
  themeId: number
}

export type SetCurrentThemeAction = AppActionMould<
  UIActionNames.SET_CURRENT_THEME,
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>({
  type: UIActionNames.SET_CURRENT_THEME,
  reducer: (state, payload) => {
    const { themeId } = payload
    return produce(state, draft => {
      draft.ui.currentThemeId = themeId
      draft.ui.currentSetId = null
      draft.guessingGame.guesses = []
    })
  }
})
