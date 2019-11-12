/* REFAC|EDITCOMMENT
The basic <span data-file-link="./action"><code>Action</code></span> shape generic parameter list now also includes app state, so we must pass that in here.
*/

import { Action } from './action'

export type ConsequenceGetterAPI<S extends object, D extends object> = {
  getState: () => S
  deps: D
  action: Action<string, any, S>
}

export type ConsequenceAPI<
  S extends object,
  D extends object
> = ConsequenceGetterAPI<S, D> & {
  dispatch: (action: Action<string, any, S>) => void
}

export type Consequence<S extends object, D extends object> = ((
  api: ConsequenceAPI<S, D>
) => void) & {
  displayName?: string
}

export type ConsequenceGetter<S extends object, D extends object> = (
  api: ConsequenceGetterAPI<S, D>
) => Consequence<S, D>[]
