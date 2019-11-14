/* REFAC|EDITCOMMENT
The new tests for <span data-file-link="./loadThemesInit">the <code>loadThemesInit</code> consequences</span> are very similar to <span data-file-link="../thunks/loadThemesThunk.test">the old tests</span> for the replaced <span data-file-link="../thunks/loadThemesThunk"><code>loadThemesThunk</code></span>.
*/
import { fixtureTheme } from '../../../../services/rebrickable'
import {
  loadThemesInit,
  loadThemesSuccess,
  loadThemesError,
  loadThemesInitConsequence
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
    const consGetter: AppConsGetter = () => [loadThemesInitConsequence]
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
