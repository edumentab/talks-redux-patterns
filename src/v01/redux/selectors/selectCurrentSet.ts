import { AppState } from '../types'
import { Set } from '../../services/rebrickable/types'
import { selectCurrentThemeSets } from './selectCurrentThemeSets'

export const selectCurrentSet = (state: AppState): Set | null => {
  const { currentSetId } = state.ui
  return (
    ((selectCurrentThemeSets(state) || {}).data || {})[currentSetId!] || null
  )
}
