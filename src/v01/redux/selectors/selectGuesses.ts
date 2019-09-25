import { AppState } from '../types'
import { selectCurrentSet } from './selectCurrentSet'

type Guess = {
  guess: number
  response: 'high' | 'low' | 'correct'
}

export const selectGuesses = (state: AppState): Guess[] | null => {
  const set = selectCurrentSet(state)
  if (!set) return null
  const answer = set.num_parts
  if (!answer) return null
  return state.guessingGame.guesses.map(guess => ({
    guess,
    response: guess > answer ? 'high' : guess === answer ? 'correct' : 'low'
  }))
}
