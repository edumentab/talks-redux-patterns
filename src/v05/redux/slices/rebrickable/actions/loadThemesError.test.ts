import { loadThemesError, loadThemesInit } from '../actions'
import { makeStore } from '../../../makeStore'

describe('the loadThemesError action', () => {
  it('sets error correctly and clears loading flag', () => {
    const { getState, dispatch } = makeStore({})
    dispatch(loadThemesInit())
    dispatch(loadThemesError({ error: 'argh' }))
    expect(getState().rebrickable.themes.loading).toBe(false)
    expect(getState().rebrickable.themes.error).toBe('argh')
  })
})
