/* REFAC|EDITCOMMENT
Since <span data-file-link="./loadThemesThunk"><code>loadThemesThunk</code></span> now gets the <span data-file-link="../../../types/appDeps"><code>AppDeps</code></span> from <span data-file-link="../../../makeStore"><code>makeStore</code></span> via the <span data-file-link="../../../lib/thunk"><code>thunk</code></span> middleware, we can now pass in our mocks directly instead of mocking imports.

The same thing applies to <span data-file-link="./loadSetsForThemeThunk.test">testing</span> the <span data-file-link="./loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>.
*/

import { loadThemesThunk } from '.'
import { fixtureTheme } from '../../../../services/rebrickable'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../actions'
import { nextTick, rigAsyncMock, makeTestStore } from '../../../../testUtils'
import { AppDeps } from '../../../types'

describe('the loadThemesThunk creator', () => {
  let deps: AppDeps
  beforeEach(() => {
    deps = {
      rebrickable: ({
        getThemesByParent: jest.fn()
      } as unknown) as AppDeps['rebrickable']
    }
  })
  it('handles happy path', async () => {
    const { dispatch } = makeTestStore({ deps })
    const { resolve } = rigAsyncMock(deps.rebrickable.getThemesByParent)

    dispatch(loadThemesThunk())
    expect(dispatch).toHaveBeenCalledWith(loadThemesInit())
    expect(deps.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesSuccess(fakeData))
  })
  it('handles sad path', async () => {
    const { dispatch } = makeTestStore({ deps })
    const { reject } = rigAsyncMock(deps.rebrickable.getThemesByParent)

    dispatch(loadThemesThunk())

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesError(error))
  })
})
