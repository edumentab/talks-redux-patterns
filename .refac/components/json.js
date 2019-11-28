import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Tree, Classes } from '@blueprintjs/core'

function jsonObj2kids(json = {}, exp, p = '__root') {
  const kids = []
  for (const [key, val] of Object.entries(json)) {
    if (key == 'aId') continue
    const id = p + '__' + key
    if (
      typeof val === 'object' &&
      val !== null &&
      Object.keys(val).length > 0
    ) {
      kids.push({
        id,
        label: <code>{key}</code>,
        childNodes: jsonObj2kids(val, exp, p + key),
        isExpanded: Boolean(exp[id])
      })
    } else {
      kids.push({
        id,
        label: (
          <code>
            {key}:{' '}
            {typeof val === 'function' ? '[function]' : JSON.stringify(val)}
          </code>
        )
      })
    }
  }
  return kids
}

export const Json = props => {
  const { json = {} } = props
  const [expanded, setExpanded] = useState({})
  const nodeClickHandler = useCallback(
    node => {
      if (node.childNodes) {
        setExpanded({
          ...expanded,
          [node.id]: !expanded[node.id]
        })
      }
    },
    [expanded]
  )
  const tree = useMemo(() => jsonObj2kids(json, expanded), [json, expanded])

  return <Tree contents={tree} onNodeClick={nodeClickHandler} />
}
