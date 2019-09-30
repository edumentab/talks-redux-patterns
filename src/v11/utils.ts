export type LoadableData<T> = {
  loading: boolean
  error: null | string
  data: null | T
}

export type ById<T> = {
  [id: string]: T
}

export const fakePromise = () => {
  let reject = (err: any) => {},
    resolve = (res: any) => {}
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

export const nextTick = (fn: Function) =>
  new Promise(resolve =>
    setTimeout(() => {
      fn()
      resolve()
    }, 0)
  )
