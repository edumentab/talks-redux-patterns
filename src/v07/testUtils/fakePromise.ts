/*
This test utility creates a regular promise and provides methods for it to be 
resolved/rejected "remotely".

Useful when testing API:s that return promises (like fetching services), but
see also the `rigAsyncMock` helper which is a higher level utility built on top
of this one.
*/

export const fakePromise = () => {
  let reject = (err: any) => {},
    resolve = (res: any) => {}
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}
