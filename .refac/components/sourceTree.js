import React, { useState, useEffect, useMemo } from 'react'
import { Tree, Classes } from '@blueprintjs/core'
import { StateIcon } from './stateIcon'
import { navigate } from '@storybook/router'

const SourceTree = ({ sourceData, brain, storybookAPI }) => {
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
      const currentPath = storybookAPI.getUrlState().path
      const newPath = currentPath.replace(/^\/[^\/]*\//, '/sourceCode/')
      navigate(newPath)
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
