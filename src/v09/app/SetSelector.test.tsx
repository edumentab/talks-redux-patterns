/* REFAC|EDITCOMMENT
<span data-file-link="./SetSelector"><code>SetSelector</code></span> now uses the <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate the <span data-file-link="../redux/lib/types/action"><code>Action</code></span> with a `.sender` prop, so we have to accommodate for that here in the tests.

The same change was made in the tests for <span data-file-link="./Guess.test"><code>Guess</code></span>, <span data-file-link="./Main.test"><code>Main</code></span> and <span data-file-link="./ThemeSelector.test"><code>ThemeSelector</code></span>.
*/

import React from 'react'
import { testRender, makeTestStore, TestStore } from '../testUtils'
import { fireEvent, waitForElement } from '@testing-library/react'
import { fixtureTheme, fixtureSet } from '../services/rebrickable'
import {
  loadThemesSuccess,
  loadSetsSuccess,
  setCurrentTheme,
  setCurrentSet,
  loadSetsInit
} from '../redux'
import { SetSelector } from './SetSelector'

describe('the SetSelector component', () => {
  let store: TestStore
  const themeId = 123
  const setId = '6086'
  beforeEach(() => {
    store = makeTestStore()
    store.dispatch(loadThemesSuccess({ [themeId]: fixtureTheme }))
    store.dispatch(setCurrentTheme(themeId))
  })
  it('shows "loading" if we have no sets in memory', () => {
    const { getByTestId } = testRender(<SetSelector />, { store })

    expect(getByTestId('setselectortrigger')).toHaveTextContent('loading')
  })
  describe('when loading sets', () => {
    beforeEach(() => {
      store.dispatch(loadSetsInit(themeId))
    })
    it('shows "loading"', () => {
      const { getByTestId } = testRender(<SetSelector />, { store })

      expect(getByTestId('setselectortrigger')).toHaveTextContent('loading')
    })
    describe('when sets in memory', () => {
      beforeEach(() => {
        store.dispatch(
          loadSetsSuccess(themeId, {
            [fixtureSet.set_num]: fixtureSet
          })
        )
      })
      it('tells us to select a set', () => {
        const { getByTestId } = testRender(<SetSelector />, { store })

        expect(getByTestId('setselectortrigger')).toHaveTextContent('elect')
      })
      describe('when opening the menu', () => {
        it('renders items and handles clicks', () => {
          const { getByTestId } = testRender(<SetSelector />, { store })

          fireEvent.click(getByTestId('setselectortrigger'))
          const option = getByTestId(`setselector-option-${fixtureSet.set_num}`)

          expect(option).toHaveTextContent(fixtureSet.name)

          fireEvent.click(option)

          waitForElement(() => {
            expect(store.dispatch).toHaveBeenCalledWith({
              ...setCurrentSet(setId),
              sender: 'VIEW(SetSelector)'
            })
          })
        })
      })
    })
  })
})
