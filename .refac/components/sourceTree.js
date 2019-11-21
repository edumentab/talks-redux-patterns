import React, { useState, useEffect, useMemo } from 'react'
import { Tree, Classes } from '@blueprintjs/core'
import { StateIcon } from './stateIcon'

const SourceTree = ({ sourceData, brain }) => {
  const [codeState, setCodeState] = useState(brain.getState().code)
  const { file = '', version } = codeState || {}

  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    const fn = brainState => setCodeState(brainState.code)
    brain.subscribe(fn)
    return () => brain.unsubscribe(fn)
  }, [brain])

  const translateNode = useMemo(() => {
    const _translate = node => ({
      id: node.id,
      ...(node.childNodes && {
        label: node.label,
        icon: 'folder-close',
        childNodes: node.childNodes.map(c => _translate(c)),
        isExpanded: !!expanded[node.id]
      }),
      ...(!node.childNodes && {
        label: ['deleted', 'nonexistent'].includes(
          sourceData.files[node.id].versions[version].state
        ) ? (
          <span style={{ textDecoration: 'line-through', color: '#CCC' }}>
            {node.label}
          </span>
        ) : (
          node.label
        ),
        icon: 'document',
        secondaryLabel: (
          <StateIcon
            state={sourceData.files[node.id].versions[version].state}
          />
        )
      })
    })
    return _translate
  }, [expanded, sourceData.files, version])

  const tree = useMemo(() => sourceData.tree.map(translateNode), [
    sourceData.tree,
    translateNode
  ])

  const nodeClickHandler = node => {
    if (node.childNodes) {
      setExpanded({
        ...expanded,
        [node.id]: !expanded[node.id]
      })
    }
  }

  return (
    <Tree
      contents={tree}
      onNodeClick={nodeClickHandler}
      className={Classes.ELEVATION_0}
    />
  )
}

export default SourceTree
