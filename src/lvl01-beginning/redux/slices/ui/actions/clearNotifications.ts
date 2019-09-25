import { Action } from '../../../types/util'

export type ClearNotificationAction = Action<'CLEAR_NOTIFICATION', undefined>

export const clearNotification = (): ClearNotificationAction => ({
  type: 'CLEAR_NOTIFICATION'
})
