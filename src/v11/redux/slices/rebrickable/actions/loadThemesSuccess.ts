import { AppAction } from '../../../types/appAction'
import { ById } from '../../../../types'
import { Theme } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadThemesSuccessPayload = ById<Theme>

export type LoadThemesSuccessAction = AppAction<
  'LOAD_THEMES_SUCCESS',
  LoadThemesSuccessPayload
>

export const [loadThemesSuccess, isLoadThemesSuccess] = factory<
  LoadThemesSuccessAction
>({
  type: 'LOAD_THEMES_SUCCESS',
  reducer: (state, payload) => {
    const data = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.data = data
    })
  }
})
