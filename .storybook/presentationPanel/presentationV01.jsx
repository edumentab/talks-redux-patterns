import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV01 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### Patterns already applied

* Full app-redux split
* combined reducer
* RSA

`}
      />
    </div>
  )
}
