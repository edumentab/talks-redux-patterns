import { Action } from './action'

export type ConsequenceAPI<S extends object, D extends object> = {
  dispatch: (action: Action<string, any, S, D>) => void
  getState: () => S
  deps: D
  action: Action<string, any, S, D>
}

export type Consequence<S extends object, D extends object> = ((
  api: ConsequenceAPI<S, D>
) => void) & {
  name: string
}

export type ConsequenceGetter<S extends object, D extends object> = (
  api: ConsequenceAPI<S, D>
) => Consequence<S, D>[]
