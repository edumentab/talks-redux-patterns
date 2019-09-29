import { loadSetsError, loadSetsInit, loadThemesSuccess } from '../actions'
import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'

describe('the loadSetsInit action', () => {
  it('sets loading flag and clears earlier error', () => {
    const { getState, dispatch } = makeStore({})
    dispatch(loadThemesSuccess({ data: { 666: fixtureTheme } }))
    dispatch(
      loadSetsError({ themeId: 666, error: 'error we want to be cleared' })
    )
    dispatch(loadSetsInit({ themeId: 666 }))
    expect(getState().rebrickable.themes.data![666].sets.error).toBe(null)
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(true)
  })
})
