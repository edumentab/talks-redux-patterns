/* REFAC|EDITCOMMENT
This test was split out from <span data-file-link="../reducer.test.ts"><code>rebrickableReducer.test</code></span>. Since `loadSetsSuccess` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/
import { loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { loadSetsSuccess } from './loadSetsSuccess'

describe('the loadSetsSuccess action', () => {
  it('sets data correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    dispatch(loadSetsInit(666))
    dispatch(loadSetsSuccess(666, { 777: fixtureSet }))
    expect(getState().rebrickable.themes.data![666].sets.data).toEqual({
      777: fixtureSet
    })
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(false)
  })
})
