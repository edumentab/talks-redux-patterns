### In version 6 we...

- make creator factories also return a guard
- use guards instead of looking at action type
- skip central app union type
- skip type enums

### Rationale

- code reads way better
- not relying on type inference anymore
