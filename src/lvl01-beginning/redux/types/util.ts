export type Action<T extends string, P> = {
  type: T
  error?: boolean
} & (P extends undefined
  ? {}
  : {
      payload: P
    })

// Utility types

export type LoadableData<T> = {
  loading: boolean
  error: null | string
  data: null | T
}

export type ById<T> = {
  [id: string]: T
}
