import { Theme } from '../../../../services/rebrickable/types'
import { LoadableData, ById } from '../../../../utilTypes'

export type RebrickableState = {
  themes: LoadableData<ById<Theme>>
}
