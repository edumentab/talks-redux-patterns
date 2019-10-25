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
            expect(store.dispatch).toHaveBeenCalledWith(
              setCurrentTheme(fixtureTheme.id)
            )

            expect(trigger).toHaveTextContent(fixtureTheme.name)
          })
        })
      })
    })
  })
})
