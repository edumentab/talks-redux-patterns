/* REFAC|EDITCOMMENT
Since the code for loading sets for a theme has been moved from the <span data-file-link="./Theme"><code>Theme</code></span> component into a <span data-file-link="../redux/slices/ui/actions/setCurrentTheme">consequence of <code>setCurrentTheme</code></span>, that logic is now tested in <span data-file-link="../redux/slices/ui/actions/setCurrentTheme.test"><code>setCurrentTheme.test</code></span> instead.
*/

import React from 'react'

import {
  loadThemesSuccess,
  loadSetsSuccess,
  setCurrentTheme,
  setCurrentSet
} from '../redux'
import { Theme } from './Theme'
import { testRender, makeTestStore, TestStore } from '../testUtils'

jest.mock('./SetSelector', () => ({ SetSelector: jest.fn(() => null) }))
import { SetSelector } from './SetSelector'

jest.mock('./Set', () => ({ Set: jest.fn(() => null) }))
import { Set } from './Set'

import { fixtureTheme } from '../services/rebrickable'

describe('The Theme component', () => {
  let store: TestStore
  const themeId = 123
  beforeEach(() => {
    store = makeTestStore()
  })
  describe('when there is no theme', () => {
    it('doesnt render set or setselector', () => {
      testRender(<Theme />, { store })

      expect(Set).not.toHaveBeenCalled()
      expect(SetSelector).not.toHaveBeenCalled()
    })
  })
  describe('when we have currentTheme', () => {
    beforeEach(() => {
      store.dispatch(loadThemesSuccess({ [themeId]: fixtureTheme }))
      store.dispatch(setCurrentTheme(themeId))
    })
    it('renders SetSelector but no Set', () => {
      testRender(<Theme />, { store })

      expect(SetSelector).toHaveBeenCalled()
      expect(Set).not.toHaveBeenCalled()
    })

    describe('when we have received an answer and selected a set', () => {
      const setId = '6090'
      beforeEach(() => {
        store.dispatch(loadSetsSuccess(themeId, {}))
        store.dispatch(setCurrentSet(setId))
      })
      it('renders a Set', () => {
        testRender(<Theme />, { store })

        expect(Set).toHaveBeenCalled()
      })
    })
  })
})
