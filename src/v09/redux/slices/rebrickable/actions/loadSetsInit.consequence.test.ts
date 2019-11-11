/* REFAC|EDITCOMMENT
We must tweak the tests to accommodate for the fact that <span data-file-link="../../../lib/consequence"><code>ConsequenceMiddleware</code></span> now populates the <span data-file-link="../../../lib/types/action"><code>Action</code></span> with a `.sender` property.

The same change was made in the <span data-file-link="./loadThemesInit.consequence.test"><code>loadThemesInit</code> consequence tests</span>.
*/

import { fixtureTheme, fixtureSet } from '../../../../services/rebrickable'
import { nextTick, makeTestStore, rigAsyncMock } from '../../../../testUtils'
import { AppConsGetter } from '../../../types'
import {
  loadSetsInitConsequence,
  loadSetsError,
  loadSetsSuccess,
  loadSetsInit,
  loadThemesSuccess
} from '.'

const consGetter: AppConsGetter = () => [loadSetsInitConsequence]

const themeId = 666
const fakeThemeData = { [themeId]: fixtureTheme }

const deps = {
  rebrickable: {
    getSetsForTheme: jest.fn()
  }
}

describe('the loadSetsInit action consequence', () => {
  it('calls service, handles happy path', async () => {
    const { resolve } = rigAsyncMock(deps.rebrickable.getSetsForTheme)
    const { dispatch } = makeTestStore({ deps, consGetter })
    dispatch(loadThemesSuccess(fakeThemeData))

    dispatch(loadSetsInit(themeId))

    expect(deps.rebrickable.getSetsForTheme).toHaveBeenCalledWith(themeId)

    const fakeData = { 5: fixtureSet }
    resolve(fakeData)

    await nextTick()

    expect(dispatch).toHaveBeenCalledWith({
      ...loadSetsSuccess(themeId, fakeData),
      sender: 'CONSEQUENCE(loadSetsInitConsequence)'
    })
  })

  it('handles sad path', async () => {
    const { reject } = rigAsyncMock(deps.rebrickable.getSetsForTheme)

    const { dispatch } = makeTestStore({ deps, consGetter })
    dispatch(loadThemesSuccess(fakeThemeData))

    dispatch(loadSetsInit(themeId))

    const error = 'KABLAM!!'
    reject(error)

    await nextTick()

    expect(dispatch).toHaveBeenCalledWith({
      ...loadSetsError(themeId, error),
      sender: 'CONSEQUENCE(loadSetsInitConsequence)'
    })
  })
})
