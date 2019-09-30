import { ActionCreator } from './types/creator'
import { Action, ActionType, ActionState, ActionPayload } from './types/action'
import { Reducer } from './types/reducer'

type CreatorBlueprint<A extends Action<string, any, any>> = {
  type: ActionType<A>
  reducer: Reducer<ActionState<A>, ActionPayload<A>>
  isError?: boolean
}

export const factory = <A extends Action<string, any, any>>(
  blueprint: CreatorBlueprint<A>
) => {
  const { type, reducer, isError } = blueprint
  const creator = (payload => ({
    type,
    payload,
    reducer,
    ...(isError && {
      error: true
    })
  })) as ActionCreator<A>
  creator.actionType = blueprint.type
  const guard = (action: Action<string, any, any>): action is A =>
    action.type === (type as string)
  return <const>[creator, guard]
}
