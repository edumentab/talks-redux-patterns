import React, { useState, useEffect, useMemo } from 'react'
import { Tree, Classes } from '@blueprintjs/core'
import { StateIcon } from './stateIcon'

import './sourceTree.css'

const SourceTree = ({ sourceData, brain, storybookAPI, goToPanel }) => {
  const [codeState, setCodeState] = useState(brain.getState().code)
  const { file = '', version } = codeState || {}

  const [expanded, setExpanded] = useState(
    file
      .split('/')
      .reduce((memo, p, i) => memo.concat(i ? memo[i - 1] + '/' + p : p), [])
      .reduce((memo, p) => ({ ...memo, [p]: true }), {})
  )

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
        label: (
          <span
            className={`treefile-${sourceData.files[node.id].versions[version].state}`}
          >
            {node.label}
          </span>
        ),
        icon: 'document',
        secondaryLabel: (
          <span className="treeFileIconHolder">
            <StateIcon
              state={sourceData.files[node.id].versions[version].state}
            />
          </span>
        ),
        isSelected: node.id === file
      })
    })
    return _translate
  }, [expanded, sourceData.files, version, file])

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
    } else {
      brain.clickLink(node.id)
      goToPanel('sourceCode')
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
