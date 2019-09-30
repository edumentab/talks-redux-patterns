import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV02 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 2 we...

* Introduce [Immer](https://github.com/immerjs/immer)
* ...no, that's it! :D

### Rationale

* procedural code is less verbose
* we still get "immutable" benefits

`}
      />
    </div>
  )
}
