---
name: guard
---

### In version 6 we...

- make creator factories also return a guard
- use guards instead of looking at action type
- skip central app union type
- skip type enums

### Rationale

- code reads way better
- not relying on type inference anymore

### File highlights

- The <span data-file-link="redux/lib/factory"><code>factory</code></span> now returns a `guard` alongside the <span data-file-link="redux/lib/types/creator"><code>Creator</code></span>
- Every action creator file now exports both creator and guard, an example is <span data-file-link="redux/slices/ui/actions/setCurrentTheme"><code>setCurrentTheme</code></span>
- The `reducers` now use `guards` instead of `switch`:ing over `action.type`, an example is <span data-file-link="redux/slices/rebrickable/reducer"><code>rebrickableReducer</code></span>
- The <span data-file-link="redux/types/appAction"><code>AppAction</code></span> type is no longer a union of all possible actions
