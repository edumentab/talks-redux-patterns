import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export const PresentationV11 = () => {
  return (
    <div>
      <ReactMarkdown
        source={`
### In version 11 we...

* allow action consequences to be passed into factory
* move existing consequences to that pattern
* turn (some) useEffect calls into consequences
* support for initial consequence upon app start

### Rationale

* domain logic should live in the redux layer
* again; the dumber the app is...

### Note

* Missing React tests would be simplified in this step
`}
      />
    </div>
  )
}
