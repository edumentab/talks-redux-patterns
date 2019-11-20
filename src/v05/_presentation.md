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

### File highlights

- There's a new <span data-file-link="redux/lib/types/thunk"><code>Thunk</code></span> type...
- ...which we adapt to our app in the <span data-file-link="redux/types/appThunk"><code>AppThunk</code></span> type...
- ...and consume in <span data-file-link="redux/lib/thunk"><code>createThunkMiddleware</code></span>
- Side effects are all translated to `thunks`, an example is <span data-file-link="redux/slices/rebrickable/thunks/loadThemesThunk"><code>loadThemesThunk</code></span>
