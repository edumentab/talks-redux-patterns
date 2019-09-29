export const fakePromise = () => {
  let reject = (err: any) => {},
    resolve = (res: any) => {}
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
