/*
A helper method to allow you to write test code that flows into the next "tick"
more cleanly. Instead of doing this...

```
methodWithAsyncConsequence()
setTimeout(() => {
  expect(stuff).toHaveChangedAccordingly()
})
```

...you can now do this:

```
methodWithAsyncConsequence()
await nextTick()
expect(stuff).toHaveChangedAccordingly()
```
*/

export const nextTick = (fn?: Function) =>
  new Promise(resolve =>
    setTimeout(() => {
      fn && fn()
      resolve()
    }, 0)
  )
