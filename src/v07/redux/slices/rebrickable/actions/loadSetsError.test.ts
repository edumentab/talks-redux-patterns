import { loadSetsError, loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'

describe('the loadSetsError action', () => {
  it('sets error correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesSuccess({ data: { 666: fixtureTheme } }))
    dispatch(loadSetsInit({ themeId: 666 }))
    dispatch(loadSetsError({ themeId: 666, error: 'argh' }))
    expect(getState().rebrickable.themes.data![666].sets.error).toBe('argh')
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(false)
  })
})
