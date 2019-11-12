/* REFAC|EDITCOMMENT
This test was split out from <span data-file-link="../reducer.test.ts"><code>rebrickableReducer.test</code></span>. Since `loadThemesInit` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/
import { loadThemesInit, loadThemesError } from '.'
import { makeStore } from '../../../makeStore'

describe('the loadThemesInit action', () => {
  it('sets loading flag correctly and clears earlier errors', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesError('error we want to be cleared'))
    dispatch(loadThemesInit())
    expect(getState().rebrickable.themes.error).toBe(null)
    expect(getState().rebrickable.themes.loading).toBe(true)
  })
})
