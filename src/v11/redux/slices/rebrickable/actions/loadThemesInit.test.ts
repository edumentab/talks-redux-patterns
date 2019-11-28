/* REFAC|EDITCOMMENT
Since we pass the <span data-file-link="../../../lib/types/consequence"><code>Consequence</code></span> definitions directly to the <span data-file-link="../../../lib/factory"><code>factory</code></span>, we can pick up <span data-file-link="./loadThemesInit"><code>loadThemesInit.consequence</code></span> from the <span data-file-link="../../../lib/types/action"><code>Action</code></span> instead of importing it.

The same thing happened in <span data-file-link="./loadSetsInit.test"><code>loadSetsInit.test</code></span>.
*/

import { fixtureTheme } from '../../../../services/rebrickable'
import {
  loadThemesInit,
  loadThemesSuccess,
  loadThemesError,
  isLoadThemesInit
} from '.'
import { nextTick, makeTestStore, rigAsyncMock } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'
import { makeStore } from '../../../makeStore'

describe('the loadThemesInit action', () => {
  it('sets loading flag correctly and clears earlier errors', () => {
    const { getState, dispatch } = makeStore()
    dispatch(loadThemesError('error we want to be cleared'))
    dispatch(loadThemesInit())
    expect(getState().rebrickable.themes.error).toBe(null)
    expect(getState().rebrickable.themes.loading).toBe(true)
  })
  describe('the loadThemesInit consequence', () => {
    const consGetter: AppConsGetter = ({ action }) =>
      isLoadThemesInit(action) ? [action.cons!] : []
    const deps = {
      rebrickable: {
        getThemesByParent: jest.fn()
      }
    }
    it('calls service, handles happy path', async () => {
      const { resolve } = rigAsyncMock(deps.rebrickable.getThemesByParent)
      const { dispatch } = makeTestStore({ deps, consGetter })

      dispatch(loadThemesInit())

      expect(deps.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

      const fakeData = { 5: fixtureTheme }
      resolve(fakeData)
      await nextTick()

      expect(dispatch).toHaveBeenCalledWith(loadThemesSuccess(fakeData))
    })
    it('handles sad path', async () => {
      const { reject } = rigAsyncMock(deps.rebrickable.getThemesByParent)
      const { dispatch } = makeTestStore({ deps, consGetter })

      dispatch(loadThemesInit())

      const error = 'oh no'
      reject(error)
      await nextTick()

      expect(dispatch).toHaveBeenCalledWith(loadThemesError(error))
    })
  })
})
