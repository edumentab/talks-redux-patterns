import { ById } from '../../../../utils'
import { AppActionMould } from '../../../types'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = AppActionMould<
  'LOAD_SETS_SUCCESS',
  LoadSetsSuccessPayload
>

export const [loadSetsSuccess, isLoadSetsSuccess] = factory<
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
