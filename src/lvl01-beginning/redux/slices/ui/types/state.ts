export type NotificationKind = 'normal' | 'error' | 'warning'

export type Notification = {
  kind?: NotificationKind
  msg: string
  id: number
}

export type UIState = {
  notifications: Notification[]
}
