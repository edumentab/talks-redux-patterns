import { ById } from '../../../../types'
import { AppAction } from '../../../types'
import { Set } from '../../../../services/rebrickable/types'
import { factory } from '../../../lib/factory'

type LoadSetsSuccessPayload = {
  data: ById<Set>
  themeId: number
}

export type LoadSetsSuccessAction = AppAction<
  'LOAD_SETS_SUCCESS',
  LoadSetsSuccessPayload
>

export const [loadSetsSuccess, isLoadSetsSuccess] = factory<
  LoadSetsSuccessAction,
  [number, ById<Set>]
>({
  type: 'LOAD_SETS_SUCCESS',
  mapper: (themeId: number, data: ById<Set>) => ({ themeId, data })
})
