import { RebrickableState } from './types/state'
import { AppAction } from '../../types/appAction'
import { RebrickableActionNames } from './types/actionNames'

export const RebrickableReducer = (
  state: RebrickableState,
  action: AppAction
): RebrickableState => {
  switch (action.type) {
    case RebrickableActionNames.LOAD_THEMES_INIT:
      return {
        ...state,
        themes: {
          error: null,
          loading: true,
          data: null
        }
      }
    case RebrickableActionNames.LOAD_THEMES_ERROR:
      const { error } = action.payload
      return {
        ...state,
        themes: {
          ...state.themes,
          loading: false,
          error
        }
      }
    case RebrickableActionNames.LOAD_THEMES_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        themes: {
          ...state.themes,
          loading: false,
          data
        }
      }
    case RebrickableActionNames.LOAD_SETS_INIT: {
      const { themeId } = action.payload
      return {
        ...state,
        setsByTheme: {
          ...state.setsByTheme,
          [themeId]: {
            loading: true,
            error: null,
            data: null
          }
        }
      }
    }
    case RebrickableActionNames.LOAD_SETS_ERROR: {
      const { themeId, error } = action.payload
      return {
        ...state,
        setsByTheme: {
          ...state.setsByTheme,
          [themeId]: {
            ...state.setsByTheme[themeId],
            loading: false,
            error
          }
        }
      }
    }
    case RebrickableActionNames.LOAD_SETS_SUCCESS: {
      const { data, themeId } = action.payload
      return {
        ...state,
        setsByTheme: {
          ...state.setsByTheme,
          [themeId]: {
            ...state.setsByTheme[themeId],
            loading: false,
            data
          }
        }
      }
    }
    default:
      return state
  }
}
