### In version 11 we...

- allow action consequences to be passed into factory
- move existing consequences to that pattern
- turn (some) useEffect calls into consequences
- support for initial consequence upon app start

### Rationale

- domain logic should live in the redux layer
- again; the dumber the app is...

### File highlights

- The basic <span data-file-link="redux/lib/types/action"><code>Action</code></span> type can now contain a <span data-file-link="redux/lib/types/consequence"><code>Consequence</code></span>
- The <span data-file-link="redux/lib/factory"><code>factory</code></span> now expects you to pass in those `consequences`
- Consequences are now passed to the factory, an example is <span data-file-link="redux/slices/rebrickable/actions/loadSetsInit"><code>loadSetsInit</code></span>
- In <span data-file-link="redux/makeStore"><code>makeStore</code></span> we read consequences from actions instead, and add support for initial consequence
- Some side effects can be moved from components to be consequences, an example is in <span data-file-link="app/Theme"><code>Theme</code></span>
