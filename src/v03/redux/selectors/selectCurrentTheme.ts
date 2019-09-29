import { AppState } from '../types'
import { Theme } from '../../services/rebrickable/types'

export const selectCurrentTheme = (state: AppState): Theme | null => {
  const { currentThemeId } = state.ui
  return (state.rebrickable.themes.data || {})[currentThemeId!] || null
}
