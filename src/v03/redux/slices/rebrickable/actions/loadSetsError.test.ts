/* REFAC|EDITCOMMENT
Since `loadSetsError` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/
import { loadSetsError, loadSetsInit, loadThemesSuccess } from '.'
import { makeStore } from '../../../makeStore'
import { fixtureTheme } from '../../../../services/rebrickable'

describe('the loadSetsError action', () => {
  it('sets error correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesSuccess({ 666: fixtureTheme }))
    dispatch(loadSetsInit(666))
    dispatch(loadSetsError(666, 'argh'))
    expect(getState().rebrickable.themes.data![666].sets.error).toBe('argh')
    expect(getState().rebrickable.themes.data![666].sets.loading).toBe(false)
  })
})
