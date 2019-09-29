import { loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { loadSetsSuccess } from './loadSetsSuccess'

describe('the loadSetsSuccess action', () => {
  it('sets data correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore({})
    dispatch(loadThemesSuccess({ data: { 666: fixtureTheme } }))
    dispatch(loadSetsInit({ themeId: 666 }))
    dispatch(loadSetsSuccess({ themeId: 666, data: { 777: fixtureSet } }))
    expect(getState().rebrickable.themes.data![666].sets.data).toEqual({
      777: fixtureSet
    })
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(false)
  })
})
