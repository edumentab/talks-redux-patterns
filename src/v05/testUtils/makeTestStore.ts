import { AppStore, makeStore, MakeStoreOpts } from '../redux'
import { applyMiddleware, Middleware } from 'redux'

/*
The exported `makeTestStore` function is a thin wrapper around the regular
`makeStore` function. The only thing is does is to put a spying mock around the
dispatch method, allowing you to do stuff like this in your tests:

```
expect(store.dispatch).toHaveBeenCalledWith(someActionCreator())
```

Some extra cruft added so that it also records middleware calls.
*/

export type TestStore = AppStore & { dispatch: jest.Mock<AppStore['dispatch']> }

export function makeTestStore(opts: MakeStoreOpts = {}) {
  const mockDispatch = jest.fn()
  const middleware: Middleware = () => next => action => {
    if (!mockDispatch.mock.calls.some(args => args[0] === action)) {
      mockDispatch.mock.calls.push([action])
      mockDispatch.mock.results.push(action)
    }
    next(action)
  }
  const store = makeStore({
    ...opts,
    enhancers: [applyMiddleware(middleware)]
  })
  const origDispatch = store.dispatch
  mockDispatch.mockImplementation(origDispatch)
  store.dispatch = mockDispatch
  return store as TestStore
}
