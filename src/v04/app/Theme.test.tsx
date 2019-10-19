import React from 'react'
import {
  loadThemesSuccess,
  loadSetsInit,
  loadSetsSuccess,
  loadSetsError,
  setCurrentTheme,
  setCurrentSet
} from '../redux'
import { Theme } from './Theme'
import { ById } from '../types'
import {
  testRender,
  makeTestStore,
  TestStore,
  nextTick,
  rigAsyncMock
} from '../testUtils'
import { waitForElement } from '@testing-library/react'

jest.mock('./SetSelector', () => ({ SetSelector: jest.fn(() => null) }))
import { SetSelector } from './SetSelector'

jest.mock('./Set', () => ({ Set: jest.fn(() => null) }))
import { Set } from './Set'

jest.mock('../services/rebrickable')
import {
  fixtureTheme,
  fixtureSet,
  getSetsForTheme
} from '../services/rebrickable'
import { Set as SetType } from '../services/rebrickable/types'

describe('The Theme component', () => {
  let store: TestStore
  const themeId = 123
  beforeEach(() => {
    rigAsyncMock(getSetsForTheme)
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
    it('dispatches loadSetsForThemeInit, calls service, handles happy path', async () => {
      const { resolve } = rigAsyncMock(getSetsForTheme)

      testRender(<Theme />, { store })

      expect(store.dispatch).toHaveBeenCalledWith(loadSetsInit(themeId))
      expect(getSetsForTheme).toHaveBeenCalledWith(themeId)

      const fakeResponse: ById<SetType> = { '6090': fixtureSet }

      resolve(fakeResponse)
      await nextTick()

      expect(store.dispatch).toHaveBeenCalledWith(
        loadSetsSuccess({ themeId, data: fakeResponse })
      )
    })
    it('handles sad path', () => {
      const { reject } = rigAsyncMock(getSetsForTheme)
      testRender(<Theme />, { store })

      waitForElement(() => {
        reject('oh no')

        expect(store.dispatch).toHaveBeenCalledWith(
          loadSetsError({ themeId, error: 'oh no' })
        )
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
