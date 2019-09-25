import { AppState } from '../types'
import { Set } from '../../services/rebrickable/types'
import { LoadableData, ById } from '../../utilTypes'

export const selectCurrentThemeSets = (
  state: AppState
): LoadableData<ById<Set>> | null => {
  const { currentThemeId } = state.ui
  return state.rebrickable.setsByTheme[currentThemeId!] || null
}
