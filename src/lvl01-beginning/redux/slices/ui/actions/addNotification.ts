import { UIActionNames } from '../types/actionNames'
import { NotificationKind } from '../types/state'
import { Action } from '../../../types/util'

type AddNotificationPayload = {
  msg: string
  id: number
  kind?: NotificationKind
}

export type AddNotificationAction = Action<
  UIActionNames.ADD_NOTIFICATION,
  AddNotificationPayload
>

export const addNotification = (
  opts: AddNotificationPayload
): AddNotificationAction => ({
  type: UIActionNames.ADD_NOTIFICATION,
  payload: opts
})
