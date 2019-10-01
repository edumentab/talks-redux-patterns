import React from 'react'
import ReactDOM from 'react-dom'

/*
To run a component locally, simply...

- change the code below to render the component you want to test
- execute `npm run local` in the terminal
- go to `http://localhost:1234` in the browser (will open automatically)
- make changes to the code and the browser will immediately update!
*/

import { App } from '../src/v01/app/App'

ReactDOM.render(<App version="local" />, document.getElementById('root'))
