---
name: cons
---

### In version 8 we...

- introduce notion of "consequences"
- rewrite all thunks into consequences

### Rationale

- get rid of the "dispatching non-action" hack
- the consequence chain is more clear

### Notes

- We will revisit consequences in <span data-file-link="v11">v11</span>

### File highlights

- There's a new generic <span data-file-link="redux/lib/types/consequence"><code>Consequence</code></span> type...
- ...which we adapt to our app in an <span data-file-link="redux/types/appCons"><code>AppCons</code></span> type...
- ...and consume in a <span data-file-link="redux/lib/consequence"><code>consequenceMiddleware</code></span>
- Side effects are translated from thunks to consequences, an example is the <span data-file-link="redux/slices/rebrickable/loadSetsInit"><code>loadSetsInit</code> consequences</span>
- We adapt <span data-file-link="redux/makeStore"><code>makeStore</code></span> to populate the new `consequenceMiddleware`
