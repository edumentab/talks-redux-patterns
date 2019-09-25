import React, {
  FunctionComponent,
  Fragment,
  useRef,
  FormEvent,
  useCallback,
  useEffect
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectGuesses, makeGuess } from '../redux'

export const Guess: FunctionComponent = () => {
  const guesses = useSelector(selectGuesses)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleGuess = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const newGuess = +inputRef.current!.value
      inputRef.current!.value = ''
      inputRef.current!.focus()
      if (!isNaN(newGuess)) {
        dispatch(makeGuess(newGuess))
      }
    },
    [dispatch]
  )

  useEffect(() => {
    setTimeout(() => {
      inputRef.current!.focus()
    })
  }, [])

  if (!guesses) {
    return <span>Unknown piececount</span>
  }
  return (
    <Fragment>
      <form onSubmit={handleGuess}>
        <input
          style={{ width: '100%' }}
          ref={inputRef}
          placeholder="Guess the # of pieces!"
        />
      </form>
      <ul>
        {guesses
          .slice()
          .reverse()
          .map((guess, n) => (
            <li key={n}>
              {guess.guess} - {guess.response}
            </li>
          ))}
      </ul>
    </Fragment>
  )
}
