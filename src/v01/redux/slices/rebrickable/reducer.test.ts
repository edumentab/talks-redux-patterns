import { RebrickableState } from './types/state'
import { initialRebrickableState } from './initialState'
import {
  loadThemesInit,
  loadThemesSuccess,
  loadThemesError,
  loadSetsInit,
  loadSetsSuccess,
  loadSetsError
} from './actions'
import { rebrickableReducer } from './reducer'
import { ById } from '../../../utils'
import { Theme, Set } from '../../../services/rebrickable/types'
import { fixtureSet, fixtureTheme } from '../../../services/rebrickable'

describe('the rebrickableReducer', () => {
  describe('for loading themes', () => {
    it('starts loading correctly', () => {
      const previousState: RebrickableState = {
        ...initialRebrickableState,
        themes: {
          loading: false,
          error: 'previous error',
          data: {}
        }
      }
      const action = loadThemesInit()
      const result = rebrickableReducer(previousState, action)
      expect(result.themes).toEqual({
        loading: true,
        error: null,
        data: null
      })
    })
    it('handles success correctly', () => {
      const previousState: RebrickableState = {
        ...initialRebrickableState,
        themes: {
          loading: true,
          error: null,
          data: null
        }
      }
      const dataPayload: ById<Theme> = { 666: fixtureTheme }
      const action = loadThemesSuccess(dataPayload)
      const result = rebrickableReducer(previousState, action)
      expect(result.themes).toEqual({
        loading: false,
        error: null,
        data: dataPayload
      })
    })
    it('handles failure correctly', () => {
      const previousState: RebrickableState = {
        ...initialRebrickableState,
        themes: {
          loading: true,
          error: null,
          data: null
        }
      }
      const action = loadThemesError('oh no')
      const result = rebrickableReducer(previousState, action)
      expect(result.themes).toEqual({
        loading: false,
        error: 'oh no',
        data: null
      })
    })
  })
  describe('for loading sets', () => {
    const stateWithTheme: RebrickableState = {
      ...initialRebrickableState,
      themes: {
        loading: false,
        error: null,
        data: {
          666: fixtureTheme
        }
      }
    }
    it('starts loading correctly', () => {
      const previousState: RebrickableState = {
        ...stateWithTheme,
        themes: {
          ...stateWithTheme.themes,
          data: {
            ...stateWithTheme.themes.data,
            666: {
              ...stateWithTheme.themes.data![666],
              sets: {
                loading: false,
                error: 'previous error',
                data: {}
              }
            }
          }
        }
      }
      const action = loadSetsInit(666)
      const result = rebrickableReducer(previousState, action)
      expect(result.themes.data![666].sets).toEqual({
        loading: true,
        error: null,
        data: null
      })
    })
    it('handles success correctly', () => {
      const previousState: RebrickableState = {
        ...stateWithTheme,
        themes: {
          ...stateWithTheme.themes,
          data: {
            ...stateWithTheme.themes.data,
            666: {
              ...stateWithTheme.themes.data![666],
              sets: {
                loading: true,
                error: null,
                data: null
              }
            }
          }
        }
      }
      const dataPayload: ById<Set> = { '6087_2': fixtureSet }
      const action = loadSetsSuccess(666, dataPayload)
      const result = rebrickableReducer(previousState, action)
      expect(result.themes.data![666].sets).toEqual({
        loading: false,
        error: null,
        data: dataPayload
      })
    })
    it('handles failure correctly', () => {
      const previousState: RebrickableState = {
        ...stateWithTheme,
        themes: {
          ...stateWithTheme.themes,
          data: {
            ...stateWithTheme.themes.data,
            666: {
              ...stateWithTheme.themes.data![666],
              sets: {
                loading: true,
                error: null,
                data: null
              }
            }
          }
        }
      }
      const action = loadSetsError(666, 'ack!')
      const result = rebrickableReducer(previousState, action)
      expect(result.themes.data![666].sets).toEqual({
        loading: false,
        error: 'ack!',
        data: null
      })
    })
  })
})
