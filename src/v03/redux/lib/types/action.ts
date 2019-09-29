export type Action<T extends string, P> = {
  type: T
  error?: boolean
} & (P extends undefined
  ? {}
  : {
      payload: P
    })
