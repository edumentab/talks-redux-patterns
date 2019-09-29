import { loadThemesInit, loadThemesError } from '../actions'
import { makeStore } from '../../../makeStore'

describe('the loadThemesInit action', () => {
  it('sets loading flag correctly and clears earlier errors', () => {
    const { getState, dispatch } = makeStore({})
    dispatch(loadThemesError({ error: 'error we want to be cleared' }))
    dispatch(loadThemesInit())
    expect(getState().rebrickable.themes.error).toBe(null)
    expect(getState().rebrickable.themes.loading).toBe(true)
  })
})
