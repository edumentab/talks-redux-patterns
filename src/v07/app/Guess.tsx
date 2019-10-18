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
import { Classes, Tag, Intent } from '@blueprintjs/core'

const responseToIntent = {
  high: 'warning',
  low: 'danger',
  correct: 'success'
}

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
      <form onSubmit={handleGuess} data-testid="guessform">
        <input
          className={Classes.INPUT}
          style={{ width: '100%' }}
          ref={inputRef}
          placeholder="Guess # of pieces!"
          data-testid="guessinput"
        />
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        data-testid="guesslist"
      >
        {guesses
          .slice()
          .reverse()
          .map((guess, n) => (
            <span key={n} style={{ marginTop: '10px' }}>
              <Tag minimal intent={responseToIntent[guess.response] as Intent}>
                {guess.guess} - {guess.response}
              </Tag>
            </span>
          ))}
      </div>
    </Fragment>
  )
}
