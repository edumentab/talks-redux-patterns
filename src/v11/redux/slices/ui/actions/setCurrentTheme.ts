import { AppAction } from '../../../types/appAction'
import { factory } from '../../../lib/factory'
import produce from 'immer'
import { loadSetsInit } from '../../rebrickable/actions'

type SetCurrentThemePayload = number

export type SetCurrentThemeAction = AppAction<
  'SET_CURRENT_THEME',
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = factory<
  SetCurrentThemeAction
>({
  type: 'SET_CURRENT_THEME',
  reducer: (state, payload) => {
    return produce(state, draft => {
      draft.ui.currentThemeId = payload
      draft.ui.currentSetId = null
      draft.guessingGame.guesses = []
    })
  },
  cons: ({ dispatch, getState }) => {
    const themeId = getState().ui.currentThemeId!
    const { sets } = getState().rebrickable.themes.data![themeId]
    if (!sets || (!sets!.data && !sets!.loading)) {
      dispatch(loadSetsInit(themeId))
    }
  }
})
