import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV10 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 10 we...

* allow actions to have their own reducer
* move all reducing into dedicated action reducers

### Rationale

* slice reducers are an artificial separation
* everything regarding an action ends up in a single place

`}
      />
    </div>
  )
}
