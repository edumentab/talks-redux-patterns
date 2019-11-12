/* REFAC|EDITCOMMENT
This test was split out from <span data-file-link="../reducer.test.ts"><code>rebrickableReducer.test</code></span>. Since `loadSetsInit` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/
import { loadSetsError, loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'

describe('the loadSetsInit action', () => {
  it('sets loading flag and clears earlier error', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    dispatch(loadSetsError(666, 'error we want to be cleared'))
    dispatch(loadSetsInit(666))
    expect(getState().rebrickable.themes.data![666].sets.error).toBe(null)
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(true)
  })
})
