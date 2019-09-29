import { AppState } from '../types'
import { Set } from '../../services/rebrickable/types'
import { LoadableData, ById } from '../../utils'
import { selectCurrentTheme } from './selectCurrentTheme'

export const selectCurrentThemeSets = (
  state: AppState
): LoadableData<ById<Set>> | null => {
  return (selectCurrentTheme(state) || {}).sets || null
}
