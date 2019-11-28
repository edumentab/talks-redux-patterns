import React, { useEffect, memo, useState } from 'react'
import { useAddonState } from '@storybook/api'
import { Json } from '../../.refac/components/json'

const ReduxStateInner = props => {
  const { brain, channel } = props
  const [reduxState, setReduxState] = useAddonState(
    'redux',
    window.__STATE || {}
  )
  useEffect(() => {
    const stateCallback = rState => {
      setReduxState(rState)
    }
    channel.on('reduxstore', stateCallback)
    return () => {
      channel.removeListener('reduxstore', stateCallback)
    }
  }, [channel, setReduxState])
  return <>{(reduxState && <Json json={reduxState.state} />) || null}</>
}

export const ReduxState = memo(ReduxStateInner)
