### In version 5 we...

- introduce [thunks](https://github.com/reduxjs/redux-thunk)
- move side effects from app to thunks
- add actionLog middleware (to be able to test)

### Rationale

- easier to test in Redux layer
- the dumber the app is the better

### Note

- Still testing via store, don't test thunks separately
- Separate thunk creators and action creators!
- Thunks aren't here to stay...
