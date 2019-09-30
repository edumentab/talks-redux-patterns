import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV05 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 5 we...

* introduce [thunks](https://github.com/reduxjs/redux-thunk)
* move side effects from app to thunks

### Rationale

* easier to test in Redux layer
* the dumber the app is the better

### Note

* The missing React tests would be simplified in this step
* Thunks aren't here to stay...

`}
      />
    </div>
  )
}
