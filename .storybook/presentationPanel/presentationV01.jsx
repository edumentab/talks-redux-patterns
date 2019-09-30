import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV01 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 1 we already have...

* Full app-redux split
* combined reducer
* separate service layer
* [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)
* action creators

### Sorry for

* Missing React tests
* Sharp corners :)
`}
      />
    </div>
  )
}
