import React, { useEffect, memo, useState } from 'react'
import { useAddonState } from '@storybook/api'
import { Json } from '../../.refac/components/json'

const ReduxActionsInner = props => {
  const { brain, channel } = props
  const [reduxState, setReduxState] = useAddonState(
    'redux',
    window.FLOO || (window.FLOO = {})
  )
  useEffect(() => {
    const actionCallback = rState => {
      setReduxState((window.FLOO = rState))
    }
    channel.on('reduxstore', actionCallback)
    return () => {
      channel.removeListener('reduxstore', actionCallback)
    }
  }, [channel, setReduxState])
  return (
    <>
      <h3>Actions:</h3>
      <ul>
        {reduxState &&
          reduxState.actions &&
          reduxState.actions.map((a, n) => (
            <li key={n}>
              <Json json={a} />
            </li>
          ))}
      </ul>
    </>
  )
}

export const ReduxActions = memo(ReduxActionsInner)
