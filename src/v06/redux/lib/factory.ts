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
