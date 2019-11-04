/* REFAC|EDITCOMMENT
Instead of just a creator, our factory now returns a tuple containing a creator and a guard.

The guard will return true if the given action is of the creator type, and also tell TypeScript about the action type.

These guards we'll now use inside our reducers (<span data-file-link="../slices/guessingGame/reducer"><code>guessingGameReducer</code></span>, <span data-file-link="../slices/rebrickable/reducer"><code>rebrickableReducer</code></span>, <span data-file-link="../slices/ui/reducer"><code>UIReducer</code></span>) instead of `switch`ing over `action.type`.

This also means that we can simplify our central <span data-file-link="../types/appAction"><code>appAction</code></span> type.
*/

import { ActionCreator } from './types/creator'
import { Action, ActionType, ActionPayload } from './types/action'

type FactoryOpts<
  A extends Action<string, any>,
  Signature extends Array<any> & { 0: any } = [ActionPayload<A>]
> = {
  type: ActionType<A>
  mapper?: (...args: Signature) => ActionPayload<A>
  isError?: boolean
}

export const factory = <
  A extends Action<string, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
>(
  blueprint: FactoryOpts<A, Sig>
) => {
  const { type, isError, mapper } = blueprint
  const creator = ((...args: Sig) => ({
    type,
    payload: mapper ? mapper(...args) : args[0],
    ...(isError && {
      error: true
    })
  })) as ActionCreator<A, Sig>
  creator.actionType = type
  const guard = (action: Action<string, any>): action is A =>
    action.type === (type as string)
  return <const>[creator, guard]
}
