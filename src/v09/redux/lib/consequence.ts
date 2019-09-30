import { ConsequenceAPI, ConsequenceGetter } from './types/consequence'
import { Action } from './types/action'
import { Middleware } from 'redux'

export const createConsequenceMiddleware = <S extends object, D extends object>(
  consGetter: ConsequenceGetter<S, D>,
  deps: D
): Middleware => {
  return ({ dispatch, getState }) => next => action => {
    next(action)
    const api: ConsequenceAPI<S, D> = {
      action,
      dispatch: (dispatch as any) as (a: Action<string, any>) => void,
      getState,
      deps
    }
    for (const cons of consGetter(api)) {
      cons(api)
    }
  }
}
