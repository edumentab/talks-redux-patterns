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

  // fix chevrons not being clickable (which is weird and annoying)
  useEffect(() => {
    const listener = e => {
      if (document.body.closest) {
        const chevron =
          e.target.closest('[data-icon="chevron-right"]') ||
          e.target.closest('[icon="chevron-right"]')
        if (chevron) {
          const content = chevron.closest('.bp3-tree-node-content')
          if (content) {
            const label = content.querySelector('.bp3-tree-node-label')
            if (label) {
              label.click()
            }
          }
        }
      }
    }
    document.body.addEventListener('click', listener)
    return () => {
      document.body.removeEventListener('click', listener)
    }
  }, [])

  return <Tree contents={tree} onNodeClick={nodeClickHandler} />
}
