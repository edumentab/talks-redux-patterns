import { loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { loadSetsSuccess } from './loadSetsSuccess'

describe('the loadSetsSuccess action', () => {
  it('sets data correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore({})
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    dispatch(loadSetsInit(666))
    dispatch(loadSetsSuccess(666, { 777: fixtureSet }))
    expect(getState().rebrickable.themes.data![666].sets.data).toEqual({
      777: fixtureSet
    })
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(false)
  })
})
