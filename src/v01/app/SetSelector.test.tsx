import React from 'react'
import { testRender, makeTestStore, TestStore } from '../testUtils'
import { fireEvent } from '@testing-library/react'
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
    it('shows "loading', () => {
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

          //fireEvent.click(getByTestId('setselectortrigger'))

          expect(
            getByTestId(`setselector-option-${fixtureSet.set_num}`)
          ).toHaveTextContent(fixtureSet.name)
        })
      })
    })
  })
})
