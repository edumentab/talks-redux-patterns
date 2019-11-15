### In version 10 we...

- allow actions to have their own reducer
- move all reducing into dedicated action reducers

### Rationale

- slice reducers are an artificial separation
- everything regarding an action ends up in a single place
