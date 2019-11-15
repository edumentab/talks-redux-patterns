### In version 7 we...

- introduce notion of "app dependencies"
- pass those into store creator...
- ...where we pass them to thunks...
- ...were we now stop importing the services

### Rationale

- much easier to test (but Jest mocking still rules)
