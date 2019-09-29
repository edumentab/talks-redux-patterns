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
  return creator
}
