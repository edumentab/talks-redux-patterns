---
name: deps
---

### In version 7 we...

- introduce notion of "app dependencies"
- pass those into store creator...
- ...where we pass them to thunks...
- ...were we now stop importing the services

### Rationale

- much easier to test (but Jest mocking still rules)

### File highlights

- We make a central <span data-file-link="redux/types/appDeps"><code>AppDeps</code></span> type that defines the dependency shape
- The <span data-file-link="redux/makeStore"><code>makeStore</code></span> function supplies the dependencies
- These are then consumed in the thunks, for example <span data-file-link="redux/slices/rebrickable/thunks/loadSetsForThemeThunk"><code>loadSetsForThemeThunk</code></span>
- Testing thunks no longer require mocking, an example is <span data-file-link="redux/slices/rebrickable/thunks/loadSetsForThemeThunk.test"><code>loadSetsForThemeThunk.test</code></span>
