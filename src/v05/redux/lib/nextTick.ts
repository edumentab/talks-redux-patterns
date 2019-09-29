export const nextTick = (fn: Function) =>
  new Promise(resolve =>
    setTimeout(() => {
      fn()
      resolve()
    }, 0)
  )
