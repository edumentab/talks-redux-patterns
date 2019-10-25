/* REFAC|EDITCOMMENT
Since `loadThemesInit` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/
import { loadThemesError, loadThemesInit } from '.'
import { makeStore } from '../../../makeStore'

describe('the loadThemesError action', () => {
  it('sets error correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesInit())
    dispatch(loadThemesError('argh'))
    expect(getState().rebrickable.themes.loading).toBe(false)
    expect(getState().rebrickable.themes.error).toBe('argh')
  })
})
