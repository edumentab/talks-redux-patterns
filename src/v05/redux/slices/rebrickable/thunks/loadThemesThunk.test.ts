/* REFAC|EDITCOMMENT
Here we test our new <span data-file-link="./loadThemesThunk"><code>loadThemesThunk</code></span> <span data-file-link="../../../types/appThunk"><code>AppThunk</code></span>.

Since `loadThemesThunk` contains side effect logic extracted from the <span data-file-link="../../../../app/Main"><code>Main.tsx</code></span> component, we can see that the tests here largely correspond to what's been removed from the <span data-file-link="../../../../app/Main.test"><code>Main</code> tests</span>.
*/

import { loadThemesThunk } from '.'

jest.mock('../../../../services/rebrickable', () => ({
  ...require.requireActual('../../../../services/rebrickable'),
  getThemesByParent: jest.fn()
}))

import {
  getThemesByParent,
  fixtureTheme
} from '../../../../services/rebrickable'
import { loadThemesInit, loadThemesSuccess, loadThemesError } from '../actions'
import { nextTick, rigAsyncMock, makeTestStore } from '../../../../testUtils'

describe('the loadThemesThunk creator', () => {
  it('handles happy path', async () => {
    const { dispatch } = makeTestStore()
    const { resolve } = rigAsyncMock(getThemesByParent)

    dispatch(loadThemesThunk())
    expect(dispatch).toHaveBeenCalledWith(loadThemesInit())
    expect(getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesSuccess(fakeData))
  })
  it('handles sad path', async () => {
    const { dispatch } = makeTestStore()
    const { reject } = rigAsyncMock(getThemesByParent)

    dispatch(loadThemesThunk())

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith(loadThemesError(error))
  })
})
