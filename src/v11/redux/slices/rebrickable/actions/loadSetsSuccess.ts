import { ById } from '../../../../types'
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
  LoadSetsSuccessAction,
  [number, ById<Set>]
>({
  type: 'LOAD_SETS_SUCCESS',
  mapper: (themeId: number, data: ById<Set>) => ({ themeId, data }),
  reducer: (state, payload) => {
    const { data, themeId } = payload
    return produce(state, draft => {
      draft.rebrickable.themes.data![themeId].sets.loading = false
      draft.rebrickable.themes.data![themeId].sets.data = data
    })
  }
})
