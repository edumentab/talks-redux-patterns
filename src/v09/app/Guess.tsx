/* REFAC|EDITCOMMENT
The <span data-file-link="../redux/lib/types/action">basic <code>Action</code> shape</span> now contains a `.sender` property, so we switch to using the new <span data-file-link="./useDispatchWithSender"><code>useDispatchWithSender</code> hook</span> which will populate `.sender` correctly (this also means having to do a slight tweak to our <span data-file-link="./Guess.test">tests</span>).

The same change was made in <span data-file-link="./Main"><code>Main</code></span>, <span data-file-link="./Theme"><code>Theme</code></span>, <span data-file-link="./SetSelector"><code>SetSelector</code></span> and <span data-file-link="./ThemeSelector"><code>ThemeSelector</code></span>.
*/

import React, {
  FunctionComponent,
  Fragment,
  useRef,
  FormEvent,
  useCallback,
  useEffect
} from 'react'
import { useSelector } from 'react-redux'
import { selectGuesses, makeGuess } from '../redux'
import { Classes, Tag, Intent } from '@blueprintjs/core'
import { useDispatchWithSender } from './useDispatchWithSender'

const responseToIntent = {
  high: 'warning',
  low: 'danger',
  correct: 'success'
}

export const Guess: FunctionComponent = () => {
  const guesses = useSelector(selectGuesses)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatchWithSender('Guess')

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
