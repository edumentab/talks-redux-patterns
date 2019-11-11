/* REFAC|EDITCOMMENT
<span data-file-link="./ThemeSelector"><code>ThemeSelector</code></span> now uses the <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate the <span data-file-link="../redux/lib/types/action"><code>Action</code></span> with a `.sender` prop, so we have to accommodate for that here in the tests.

The same change was made in the tests for <span data-file-link="./Guess.test"><code>Guess</code></span>, <span data-file-link="./Main.test"><code>Main</code></span>, <span data-file-link="./Theme.test"><code>Theme</code></span> and <span data-file-link="./SetSelector.test"><code>SetSelector</code></span>.
*/

import React from 'react'
import { testRender, makeTestStore, TestStore } from '../testUtils'
import { fireEvent, waitForElement } from '@testing-library/react'
import { fixtureTheme } from '../services/rebrickable'
import { loadThemesSuccess, loadThemesInit, setCurrentTheme } from '../redux'
import { ThemeSelector } from './ThemeSelector'

describe('the ThemeSelector component', () => {
  let store: TestStore
  beforeEach(() => {
    store = makeTestStore()
  })
  it('shows "loading" if we have no themes in memory', () => {
    const { getByTestId } = testRender(<ThemeSelector />, { store })

    expect(getByTestId('themeselectortrigger')).toHaveTextContent('loading')
  })
  describe('when loading themes', () => {
    beforeEach(() => {
      store.dispatch(loadThemesInit())
    })
    it('shows "loading"', () => {
      const { getByTestId } = testRender(<ThemeSelector />, { store })

      expect(getByTestId('themeselectortrigger')).toHaveTextContent('loading')
    })
    describe('when themes in memory', () => {
      beforeEach(() => {
        store.dispatch(loadThemesSuccess({ [fixtureTheme.id]: fixtureTheme }))
      })
      it('tells us to select a theme', () => {
        const { getByTestId } = testRender(<ThemeSelector />, { store })

        expect(getByTestId('themeselectortrigger')).toHaveTextContent('elect')
      })
      describe('when opening the menu', () => {
        it('renders items and handles clicks', () => {
          const { getByTestId } = testRender(<ThemeSelector />, { store })
          const trigger = getByTestId('themeselectortrigger')

          fireEvent.click(trigger)
          const option = getByTestId(`themeselector-option-${fixtureTheme.id}`)

          expect(option).toHaveTextContent(fixtureTheme.name)

          fireEvent.click(option)

          waitForElement(() => {
            expect(store.dispatch).toHaveBeenCalledWith({
              ...setCurrentTheme(fixtureTheme.id),
              sender: 'VIEW(ThemeSelector)'
            })

            expect(trigger).toHaveTextContent(fixtureTheme.name)
          })
        })
      })
    })
  })
})
