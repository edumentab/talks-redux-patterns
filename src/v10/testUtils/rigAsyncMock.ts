import { fakePromise } from './fakePromise'

/*
A helper for testing functions that return promises. Usage flow:

```
const { resolve } = rigAsyncMock(mockedMethod)
resolve(someTestData)
expect(stuffUsingMockedMethod).toHaveReactedCorrectly()
```
*/

export const rigAsyncMock = <T>(service: T) => {
  const { resolve, reject, promise } = fakePromise()
  ;((service as any) as jest.Mock).mockReturnValue(promise)
  return { resolve, reject }
}
