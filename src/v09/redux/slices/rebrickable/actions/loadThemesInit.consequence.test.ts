/* REFAC|EDITCOMMENT
We must tweak the tests to accommodate for the fact that <span data-file-link="../../../lib/consequence"><code>ConsequenceMiddleware</code></span> now populates the <span data-file-link="../../../lib/types/action"><code>Action</code></span> with a `.sender` property.

The same change was made in the <span data-file-link="./loadSetsInit.consequence.test"><code>loadSetsInit</code> consequence tests</span>.
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

const consGetter: AppConsGetter = () => [loadThemesInitConsequence]

const deps = {
  rebrickable: {
    getThemesByParent: jest.fn()
  }
}

describe('the loadThemesInit consequence', () => {
  it('calls service, handles happy path', async () => {
    const { resolve } = rigAsyncMock(deps.rebrickable.getThemesByParent)
    const { dispatch } = makeTestStore({ deps, consGetter })

    dispatch(loadThemesInit())

    expect(deps.rebrickable.getThemesByParent).toHaveBeenCalledWith(186)

    const fakeData = { 5: fixtureTheme }
    resolve(fakeData)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith({
      ...loadThemesSuccess(fakeData),
      sender: 'CONSEQUENCE(loadThemesInitConsequence)'
    })
  })
  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(deps.rebrickable.getThemesByParent)
    const { dispatch } = makeTestStore({ deps, consGetter })

    dispatch(loadThemesInit())

    const error = 'oh no'
    reject(error)
    await nextTick()

    expect(dispatch).toHaveBeenCalledWith({
      ...loadThemesError(error),
      sender: 'CONSEQUENCE(loadThemesInitConsequence)'
    })
  })
})
