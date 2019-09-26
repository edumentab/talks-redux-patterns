export type LoadableData<T> = {
  loading: boolean
  error: null | string
  data: null | T
}

export type ById<T> = {
  [id: string]: T
}
