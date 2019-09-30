import { ConsequenceAPI, ConsequenceGetter } from './types/consequence'
import { Middleware } from 'redux'
import { Action } from './types/action'

export const createConsequenceMiddleware = <S extends object, D extends object>(
  consGetter: ConsequenceGetter<S, D>,
  deps: D
): Middleware => {
  return ({ dispatch, getState }) => next => action => {
    next(action)
    const api: ConsequenceAPI<S, D> = {
      action,
      dispatch: (dispatch as any) as (a: Action<string, any, S, D>) => void,
      getState,
      deps
    }
    for (const cons of consGetter(api)) {
      cons({
        ...api,
        dispatch: (a: Action<string, any, S, D>) => {
          // @ts-ignore
          a.sender = `CONSEQUENCE(${cons.displayName || cons.name})`
          return api.dispatch(a)
        }
      })
    }
  }
}
