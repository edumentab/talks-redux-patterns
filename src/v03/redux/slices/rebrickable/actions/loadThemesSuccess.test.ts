import { loadThemesSuccess, loadThemesInit } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'

describe('the loadThemesSuccess action', () => {
  it('sets data and clears loading flag', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesInit())
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    expect(getState().rebrickable.themes.data).toEqual({ 666: fixtureTheme })
    expect(getState().rebrickable.themes.loading).toBe(false)
  })
})
