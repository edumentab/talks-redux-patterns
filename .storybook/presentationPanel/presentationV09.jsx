import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV09 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 9 we...

* allow actions to have "sender"
* provide useDispatch alternative that marks sender
* makes consequence-dispatched actions get sender

### Rationale

* consequence chain is clearer still
* easier to differentiate between "view actions" and "side effect actions"
`}
      />
    </div>
  )
}
