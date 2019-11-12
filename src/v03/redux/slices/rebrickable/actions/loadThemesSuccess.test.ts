/* REFAC|EDITCOMMENT
This test was split out from <span data-file-link="../reducer.test.ts"><code>rebrickableReducer.test</code></span>. Since `loadThemesSuccess` only affected a single state slice, we don't get any immediate benefit by extracting these tests from the old reducer tests besides being able to put this test file next to the action creator file.

See the tests for <span data-file-link="../../ui/actions/setCurrentSet.test.ts"><code>setCurrentSet</code></span> and <span data-file-link="../../ui/actions/setCurrentTheme.test.ts"><code>setCurrentTheme</code></span> for examples of cross-slice actions where we now gain clarity!
*/
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
