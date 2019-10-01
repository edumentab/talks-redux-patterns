import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV99 = () => {
  return (
    <div>
      <img src="/bye.gif" style={{ maxWidth: '100%' }} />
      <ReactMarkdown
        source={`
* [https://redux-patterns.netlify.com](https://redux-patterns.netlify.com)
* [https://github.com/edumentab/talks-redux-patterns](https://github.com/edumentab/talks-redux-patterns)
* [https://blog.krawaller.se/](https://blog.krawaller.se/)
* [https://edument.se/](https://edument.se/)
* [mailto:david@krawaller.se](david@krawaller.se)

`}
      />
    </div>
  )
}
