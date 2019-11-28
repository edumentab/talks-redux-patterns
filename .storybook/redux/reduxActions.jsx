import React, { useEffect, memo, useMemo, useState } from 'react'
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
  const actionsObj = useMemo(
    () =>
      (reduxState.actions &&
        reduxState.actions.reduce(
          (memo, a) => ({ ...memo, [a.aId + ') ' + a.type]: a }),
          {}
        )) ||
      {},
    [reduxState.actions]
  )
  const list = useMemo(() => <Json json={actionsObj} />, [actionsObj])
  return list
}

export const ReduxActions = memo(ReduxActionsInner)
