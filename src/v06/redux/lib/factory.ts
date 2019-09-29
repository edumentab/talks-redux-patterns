import { ActionCreator } from './types/creator'
import { Action, ActionType } from './types/action'

export const factory = <A extends Action<string, any>>(
  type: ActionType<A>,
  isError?: boolean
) => {
  const creator = (payload => ({
    type,
    payload,
    ...(isError && {
      error: true
    })
  })) as ActionCreator<A>
  creator.actionType = type
  const guard = (action: Action<string, any>): action is A =>
    action.type === (type as string)
  return <const>[creator, guard]
}
