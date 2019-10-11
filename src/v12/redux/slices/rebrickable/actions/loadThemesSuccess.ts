import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'
import { ById } from '../../../../utils'
import { Theme } from '../../../../services/rebrickable/types'

type LoadThemesSuccessPayload = {
  data: ById<Theme>
}

export type LoadThemesSuccessAction = AppActionMould<
  'LOAD_THEMES_SUCCESS',
  LoadThemesSuccessPayload
>

export const [loadThemesSuccess, isLoadThemesSuccess] = actionCreatorFactory<
  LoadThemesSuccessAction
>({
  type: 'LOAD_THEMES_SUCCESS',
  reducer: (state, payload) => {
    const { data } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.loading = false
      draft.rebrickable.themes.data = data
    })
  }
})
