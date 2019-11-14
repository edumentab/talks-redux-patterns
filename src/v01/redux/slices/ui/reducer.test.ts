import { UIReducer } from './reducer'
import { initialUIState } from './initialState'
import { UIState } from './types/state'
import { setCurrentTheme, setCurrentSet } from './actions'

describe('the UIReducer', () => {
  const startState: UIState = {
    ...initialUIState,
    currentSetId: '6087_2',
    currentThemeId: 188
  }
  it('handles setCurrentTheme', () => {
    const action = setCurrentTheme(201)
    const result = UIReducer(startState, action)
    expect(result.currentThemeId).toBe(201)
  })
  it('handles setCurrentSet', () => {
    const action = setCurrentSet('6090_2')
    const result = UIReducer(startState, action)
    expect(result.currentSetId).toBe('6090_2')
  })
})
