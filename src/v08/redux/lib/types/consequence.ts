/* REFAC|EDITCOMMENT
The `Consequence` is the new concept introduced in this version, replacing <span data-file-link="./thunk"><code>Thunks</code></span>. It represents a definition of side effects to be executed after an action is dispatched. We consume this type in the app-specific `AppCons`, which in turn is used in the consequence definitions for <span data-file-link="../../slices/rebrickable/actions/loadSetsInit"><code>loadSetsInit</code></span> and <span data-file-link="../../slices/rebrickable/actions/loadThemesInit"><code>loadThemesInit</code></span> (which replaces <span data-file-link="../../slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span> and <span data-file-link="../../slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span>).

For plugging the consequences in there's a new <span data-file-link="../consequence">consequence middleware</span> that <span data-file-link="../../makeStore"><code>makeStore</code></span> now makes use of.
*/

import { Action } from './action'

export type ConsequenceGetterAPI<S extends object, D extends object> = {
  getState: () => S
  deps: D
  action: Action<string, any>
}

export type ConsequenceAPI<
  S extends object,
  D extends object
> = ConsequenceGetterAPI<S, D> & {
  dispatch: (action: Action<string, any>) => void
}

export type Consequence<S extends object, D extends object> = ((
  api: ConsequenceAPI<S, D>
) => void) & {
  displayName?: string
}

export type ConsequenceGetter<S extends object, D extends object> = (
  api: ConsequenceGetterAPI<S, D>
) => Consequence<S, D>[]
