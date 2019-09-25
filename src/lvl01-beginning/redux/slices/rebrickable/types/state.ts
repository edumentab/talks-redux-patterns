import { Theme, Set } from '../../../../services/rebrickable/types'
import { LoadableData, ById } from '../../../types/util'

export type RebrickableState = {
  themes: LoadableData<ById<Theme>>
  setsByTheme: ById<LoadableData<ById<Set>>>
}
