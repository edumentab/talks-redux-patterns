/* REFAC|EDITCOMMENT
In this version we can pass <span data-file-link="./types/consequence"><code>Consequence</code></span> to the <code>Factory</code>. This vastly simplifies things in <span data-file-link="../makeStore"><code>makeStore</code></span> and the `consGetter`.

Also we have to accommodate for the fact that <span data-file-link="./types/action"><code>Action</code></span> now takes `Dependencies` as a fourth generic parameter. The same tweak was made in <span data-file-link="./types/consequence"><code>Consequence</code></span> and <span data-file-link="../types/appAction"><code>AppAction</code></span>.
*/

import { ActionCreator } from './types/creator'
import {
  Action,
  ActionType,
  ActionState,
  ActionPayload,
  ActionDeps
} from './types/action'
import { Reducer } from './types/reducer'
import { Consequence } from './types/consequence'

type FactoryOpts<
  A extends Action<string, any, any, any>,
  Signature extends Array<any> & { 0: any } = [ActionPayload<A>]
> = {
  type: ActionType<A>
  mapper?: (...args: Signature) => ActionPayload<A>
  reducer: Reducer<ActionState<A>, ActionPayload<A>>
  isError?: boolean
  cons?: Consequence<ActionState<A>, ActionDeps<A>>
}

export const factory = <
  A extends Action<string, any, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
>(
  blueprint: FactoryOpts<A, Sig>
) => {
  const { type, reducer, isError, mapper, cons } = blueprint
  if (cons) {
    cons.displayName = type
  }
  const creator = ((...args: Sig) => ({
    type,
    payload: mapper ? mapper(...args) : args[0],
    ...(reducer && {
      reducer
    }),
    ...(isError && {
      error: true
    }),
    ...(cons && {
      cons
    })
  })) as ActionCreator<A, Sig>
  creator.actionType = blueprint.type
  const guard = (action: Action<string, any, any, any>): action is A =>
    action.type === (type as string)
  return <const>[creator, guard]
}
