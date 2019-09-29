import { loadSetsError, loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'

describe('the loadSetsInit action', () => {
  it('sets loading flag and clears earlier error', () => {
    const { getState, dispatch } = makeStore({})
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    dispatch(loadSetsError(666, 'error we want to be cleared'))
    dispatch(loadSetsInit(666))
    expect(getState().rebrickable.themes.data![666].sets.error).toBe(null)
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(true)
  })
})
