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
