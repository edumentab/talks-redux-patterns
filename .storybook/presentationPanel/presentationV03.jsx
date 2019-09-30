import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV03 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 3 we...

* remove reducer tests
* instead test through store

### Rationale

* the store is the API for the app
* reducers are an implementation detail (yep!)
* changing reducer setup shouldn't affect tests

`}
      />
    </div>
  )
}
