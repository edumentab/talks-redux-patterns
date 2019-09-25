import { Action } from '../../../types/util'

type RemoveNotificationPayload = {
  id: number
}

export type RemoveNotificationAction = Action<
  'REMOVE_NOTIFICATION',
  RemoveNotificationPayload
>

export const removeNotification = (id: number): RemoveNotificationAction => ({
  type: 'REMOVE_NOTIFICATION',
  payload: { id }
})
