import React, { FunctionComponent } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { AppStore } from '../redux'

/*
The exported `testRender` function is a wrapper around `render` from '@testing-library/react'.
In addition to the usual render options it takes a store, and will wrap the given UI with a
react-redux provider for that store. 

This is useful when testing components using the useDispatch/useSelector hooks.
*/

type TestRenderProps = RenderOptions & {
  store: AppStore
}

const TestProvider: FunctionComponent<{ store: AppStore }> = ({
  store,
  children
}) => <Provider store={store}>{children}</Provider>

export function testRender(
  ui: Parameters<typeof render>[0],
  { store, ...otherOpts }: TestRenderProps
) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts)
}
