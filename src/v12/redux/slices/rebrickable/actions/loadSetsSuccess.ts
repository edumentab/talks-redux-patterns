import { actionCreatorFactory } from 'conduxion'
import produce from 'immer'

import { AppActionMould } from '../../../types'
import { ById } from '../../../../utils'
import { Set } from '../../../../services/rebrickable/types'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = AppActionMould<
  'LOAD_SETS_SUCCESS',
  LoadSetsSuccessPayload
>

export const [loadSetsSuccess, isLoadSetsSuccess] = actionCreatorFactory<
  LoadSetsSuccessAction
>({
  type: 'LOAD_SETS_SUCCESS',
  reducer: (state, payload) => {
    const { data, themeId } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets.loading = false
      draft.rebrickable.themes.data![themeId].sets.data = data
    })
  }
})
