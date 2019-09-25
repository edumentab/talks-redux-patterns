import { AppState } from '../types'
import { Set } from '../../services/rebrickable/types'

export const selectCurrentSet = (state: AppState): Set | null => {
  const { currentSetId, currentThemeId } = state.ui
  return (
    ((state.rebrickable.setsByTheme[currentThemeId!] || {}).data || {})![
      currentSetId!
    ] || null
  )
}
