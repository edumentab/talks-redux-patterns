/* REFAC|EDITCOMMENT
Every action creator is now created by this factory, and cast to the new cast to the new <span data-file-link="./types/creator.ts"><code>Creator</code></span> type. This setup will serve as a single point of entry for other patterns that we will apply later on.

By default an action creator will take a single parameter which becomes the payload of the created action. If you want a different signature (like we do for the <span data-file-link="../slices/rebrickable/actions/loadSetsSuccess.ts"><code>loadSetsSuccess</code></span> and <span data-file-link="../slices/rebrickable/actions/loadSetsError.ts"><code>loadSetsError</code></span> actions) you can provide a `mapper` to the factory.
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
  return creator
}
