import { AppActionMould } from '../../../types'
import { factory } from '../../../lib/factory'
import produce from 'immer'

export type LoadThemesInitAction = AppActionMould<'LOAD_THEMES_INIT', undefined>

export const [loadThemesInit, isLoadThemesInit] = factory<LoadThemesInitAction>(
  {
    type: 'LOAD_THEMES_INIT',
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
