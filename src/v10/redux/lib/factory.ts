/* REFAC|EDITCOMMENT
The basic <span data-file-link="./types/action"><code>Action</code></span> shape can now take a `reducer`. We therefore add this to the factory options and <span data-file-link="./types/creator"><code>Creator</code></span> type, and make the returned creator populate every created action with the given reducer.

These reducers are then consumed in the central <span data-file-link="../rootReducer"><code>rootReducer</code></span>.
*/

import { ActionCreator } from './types/creator'
import { Action, ActionType, ActionState, ActionPayload } from './types/action'
import { Reducer } from './types/reducer'

type FactoryOpts<
  A extends Action<string, any, any>,
  Signature extends Array<any> & { 0: any } = [ActionPayload<A>]
> = {
  type: ActionType<A>
  mapper?: (...args: Signature) => ActionPayload<A>
  reducer: Reducer<ActionState<A>, ActionPayload<A>>
  isError?: boolean
}

export const factory = <
  A extends Action<string, any, any>,
  Sig extends Array<any> & { 0: any } = [ActionPayload<A>]
>(
  blueprint: FactoryOpts<A, Sig>
) => {
  const { type, reducer, isError, mapper } = blueprint
  const creator = ((...args: Sig) => ({
    type,
    payload: mapper ? mapper(...args) : args[0],
    ...(reducer && {
      reducer
    }),
    ...(isError && {
      error: true
    })
  })) as ActionCreator<A, Sig>
  creator.actionType = blueprint.type
  const guard = (action: Action<string, any, any>): action is A =>
    action.type === (type as string)
  return <const>[creator, guard]
}
