### In version 10 we...

- allow actions to have their own reducer
- move all reducing into dedicated action reducers

### Rationale

- slice reducers are an artificial separation
- everything regarding an action ends up in a single place

### File highlights

- The basic <span data-file-link="redux/lib/types/action"><code>Action</code></span> type can now contain a <span data-file-link="redux/lib/types/reducer"><code>Reducer</code></span>
- The <span data-file-link="redux/lib/factory"><code>factory</code></span> now expects callers to provide those reducers
- We supply `reducer`s when making creators, an example is <span data-file-link="redux/slices/guessingGame/actions/makeGuess"><code>makeGuess</code></span>
- The <span data-file-link="redux/rootReducer"><code>rootReducer</code></span> now simply calls the action reducers
