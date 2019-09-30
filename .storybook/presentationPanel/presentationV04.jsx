import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV04 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 4 we...

* introduce the action creator factory ([Inception](https://www.imdb.com/title/tt1375666/) much?)
* switch all action creators to use it

### Rationale

* no benefit of its own...
* ...but will be vehicle for what's coming 

### Notes

* this means creator signature equals payload shape

`}
      />
    </div>
  )
}
