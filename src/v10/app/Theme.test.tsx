import React from 'react'

import {
  loadThemesSuccess,
  loadSetsInit,
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

jest.mock('../services/rebrickable')
import { fixtureTheme, getSetsForTheme } from '../services/rebrickable'

describe('The Theme component', () => {
  let store: TestStore
  const themeId = 123
  beforeEach(() => {
    store = makeTestStore()
  })
  describe('when there is no theme', () => {
    it('doesnt load sets when there is no theme', () => {
      const prevCallCount = store.dispatch.mock.calls.length

      testRender(<Theme />, { store })

      expect(store.dispatch).toHaveBeenCalledTimes(prevCallCount)
      expect(getSetsForTheme).not.toHaveBeenCalled()
    })
    it('doesnt render set or setselector', () => {
      testRender(<Theme />, { store })

      expect(Set).not.toHaveBeenCalled()
      expect(SetSelector).not.toHaveBeenCalled()
    })
  })
  describe('when we have currentTheme', () => {
    beforeEach(() => {
      store.dispatch(loadThemesSuccess({ data: { [themeId]: fixtureTheme } }))
      store.dispatch(setCurrentTheme(themeId))
    })
    it('renders SetSelector but no Set', () => {
      testRender(<Theme />, { store })

      expect(SetSelector).toHaveBeenCalled()
      expect(Set).not.toHaveBeenCalled()
    })
    it('dispatches loadSetsInit', () => {
      testRender(<Theme />, { store })

      expect(store.dispatch).toHaveBeenCalledWith({
        ...loadSetsInit(themeId),
        sender: 'VIEW(Theme)'
      })
    })
    describe('when we are loading sets for the theme', () => {
      beforeEach(() => {
        store.dispatch(loadSetsInit(themeId))
      })
      it('doesnt start loading again', () => {
        const prevCallCount = store.dispatch.mock.calls.length
        testRender(<Theme />, { store })

        expect(store.dispatch).toHaveBeenCalledTimes(prevCallCount)
      })
      describe('when we have received an answer and selected a set', () => {
        const setId = '6090'
        beforeEach(() => {
          store.dispatch(loadSetsSuccess({ themeId, data: {} }))
          store.dispatch(setCurrentSet(setId))
        })
        it('renders a Set', () => {
          testRender(<Theme />, { store })

          expect(Set).toHaveBeenCalled()
        })
        it('doesnt start loading again', () => {
          const prevCallCount = store.dispatch.mock.calls.length
          testRender(<Theme />, { store })

          expect(store.dispatch).toHaveBeenCalledTimes(prevCallCount)
        })
      })
    })
  })
})
