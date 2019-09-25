import { RebrickableState } from './types/state'

export const initialRebrickableState: RebrickableState = {
  setsByTheme: {},
  themes: {
    loading: false,
    error: null,
    data: null
  }
}
