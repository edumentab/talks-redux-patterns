import { RebrickableActionNames } from '../types/actionNames'
import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

export type LoadThemesInitAction = AppActionMould<
  RebrickableActionNames.LOAD_THEMES_INIT,
  undefined
>

export const [loadThemesInit, isLoadThemesInit] = factory<LoadThemesInitAction>(
  {
    type: RebrickableActionNames.LOAD_THEMES_INIT,
    reducer: state => {
      return produce(state, draft => {
        draft.rebrickable.themes = {
          error: null,
          loading: true,
          data: null
        }
      })
    }
  }
)
