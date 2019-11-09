/* REFAC|EDITCOMMENT
A middleware to hook in <span data-file-link="./types/consequence"><code>consequences</code></span>, our new way of definining side effects.

Used in <span data-file-link="../makeStore"><code>makeStore</code></span>.
*/

import { ConsequenceGetter } from './types/consequence'
import { Middleware } from 'redux'

export const createConsequenceMiddleware = <S extends object, D extends object>(
  consGetter: ConsequenceGetter<S, D>,
  deps: D
): Middleware => ({ dispatch, getState }) => next => action => {
  next(action)
  for (const cons of consGetter({ action, getState, deps })) {
    cons({ action, getState, deps, dispatch })
  }
}
