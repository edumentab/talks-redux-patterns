import { Theme } from '../../../../services/rebrickable/types'
import { LoadableData, ById } from '../../../../types'

export type RebrickableState = {
  themes: LoadableData<ById<Theme>>
}
