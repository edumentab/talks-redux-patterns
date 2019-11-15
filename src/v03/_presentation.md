### In version 3 we...

- remove reducer tests
- instead test through store

### Rationale

- the store is the API for the app
- reducers are an implementation detail (yep!)
- changing reducer setup shouldn't affect tests

### Notes

- all action-related change tests are colocated
