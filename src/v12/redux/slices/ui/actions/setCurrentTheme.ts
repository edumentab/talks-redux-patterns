import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'
import { loadSetsInit } from '../../rebrickable/actions'

type SetCurrentThemePayload = {
  themeId: number
}

export type SetCurrentThemeAction = AppActionMould<
  'SET_CURRENT_THEME',
  SetCurrentThemePayload
>

export const [setCurrentTheme, isSetCurrentTheme] = actionCreatorFactory<
  SetCurrentThemeAction
>({
  type: 'SET_CURRENT_THEME',
  reducer: (state, payload) => {
    const { themeId } = payload
    return produce(state, draft => {
      draft.ui.currentThemeId = themeId
      draft.ui.currentSetId = null
      draft.guessingGame.guesses = []
    })
  },
  consequence: ({ dispatch, getState }) => {
    const themeId = getState().ui.currentThemeId!
    const { sets } = getState().rebrickable.themes.data![themeId]
    if (!sets || (!sets!.data && !sets!.loading)) {
      dispatch(loadSetsInit({ themeId }))
    }
  }
})
