import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV01 = () => {
  return (
    <ReactMarkdown
      source={`
### So!

* foo
* bar
* baz

gnurp!
`}
    />
  )
}
