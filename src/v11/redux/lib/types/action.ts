/* REFAC|EDITCOMMENT
In this version we allow the `Action` type to contain <span data-file-link="./consequence"><code>Consequences</code></span>, which will be populated by the <span data-file-link="../factory"><code>factory</code></span>. This allows us to move side effect triggers from the UI into the datalayer.

To accommodate for this addition we have to add `Dependencies` to the generic parameters for `Action`, which in turn causes smaller tweaks in <span data-file-link="./creator"><code>Creator</code></span>, <span data-file-link="./consequence"><code>Consequence</code></span> and <span data-file-link="../../types/appAction"><code>AppAction</code></span>.
*/

import { Reducer } from './reducer'
import { Consequence } from './consequence'

export interface Action<
  T extends string,
  P,
  S extends object,
  D extends object
> {
  type: T
  error?: boolean
  sender?: string
  reducer?: Reducer<S, P>
  payload: P
  cons?: Consequence<S, D>
}

export type ActionType<A> = A extends Action<infer T, any, any, any> ? T : never
export type ActionPayload<A> = A extends Action<string, infer P, any, any>
  ? P
  : never
export type ActionState<A> = A extends Action<string, any, infer S, any>
  ? S
  : never
export type ActionDeps<A> = A extends Action<string, any, any, infer D>
  ? D
  : never
