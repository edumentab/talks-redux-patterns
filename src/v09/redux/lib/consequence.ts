import { ConsequenceAPI, ConsequenceGetter } from './types/consequence'
import { Middleware } from 'redux'

export const createConsequenceMiddleware = <A, S, D>(
  consGetter: ConsequenceGetter<A, S, D>,
  deps: D
): Middleware => {
  return ({ dispatch, getState }) => next => action => {
    next(action)
    const api: ConsequenceAPI<A, S, D> = {
      action,
      dispatch: (dispatch as any) as (a: A) => void,
      getState,
      deps
    }
    for (const cons of consGetter(api)) {
      cons(api)
    }
  }
}
