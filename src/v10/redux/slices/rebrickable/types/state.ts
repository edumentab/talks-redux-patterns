import { Theme } from '../../../../services/rebrickable/types'
import { LoadableData, ById } from '../../../../utils'

export type RebrickableState = {
  themes: LoadableData<ById<Theme>>
}
