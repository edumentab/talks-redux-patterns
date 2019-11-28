/* REFAC|EDITCOMMENT
We have to slightly tweak `Consequence` to accommodate for the fact that <span data-file-link="./action"><code>Action</code></span> now takes `Dependencies` as a fourth generic parameter.

The same tweak was made in <span data-file-link="../factory"><code>Factory</code></span>, <span data-file-link="./creator"><code>Creator</code></span> and <span data-file-link="../../types/appAction"><code>AppAction</code></span>.
*/

import { Action } from './action'

export type ConsequenceGetterAPI<S extends object, D extends object> = {
  getState: () => S
  deps: D
  action: Action<string, any, S, D>
}

export type ConsequenceAPI<
  S extends object,
  D extends object
> = ConsequenceGetterAPI<S, D> & {
  dispatch: (action: Action<string, any, S, D>) => void
}

export type Consequence<S extends object, D extends object> = ((
  api: ConsequenceAPI<S, D>
) => void) & {
  displayName?: string
}

export type ConsequenceGetter<S extends object, D extends object> = (
  api: ConsequenceGetterAPI<S, D>
) => Consequence<S, D>[]
