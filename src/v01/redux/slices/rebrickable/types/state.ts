import { Theme, Set } from '../../../../services/rebrickable/types'
import { LoadableData, ById } from '../../../../utilTypes'

export type RebrickableState = {
  themes: LoadableData<ById<Theme>>
  setsByTheme: ById<LoadableData<ById<Set>>>
}
