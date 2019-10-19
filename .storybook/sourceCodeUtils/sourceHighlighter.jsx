import React, { useCallback } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import createElement from 'react-syntax-highlighter/dist/create-element'
import classNames from 'classnames'
import { diffWords } from 'diff'

const HighlighterInner = props => {
  const { fileInfo, language = 'typescript', version, onLinkClick } = props
  const fileVersion = (fileInfo && fileInfo.versions[version]) || {}
  const code = ((fileInfo && fileInfo.raw) || [])[fileVersion.which] || ''
  const diff =
    fileVersion.state === 'edited' &&
    diffWords(fileInfo.raw[fileVersion.previous], code)

  const handleLinkClick = useCallback(
    e => {
      const link =
        e.target.getAttribute('data-link-row') ||
        e.target.parentNode.getAttribute('data-link-row')
      if (link) {
        onLinkClick(link)
      }
    },
    [onLinkClick]
  )
  return (
    <React.Fragment>
      <div className="source-code" onClick={handleLinkClick}>
        <SyntaxHighlighter
          style={prism}
          customStyle={{ backgroundColor: 'transparent', fontSize: '0.8em' }}
          language={language}
          renderer={({ rows, stylesheet, useInlineStyles }) => {
            return rows.map((row, i) => {
              const children = row.children.map(mapChild)
              const link = children.find(
                child => (child.properties || {})['data-link']
              )
              return createElement({
                node: {
                  ...row,
                  properties: {
                    ...row.properties,
                    className: [],
                    ...(link && {
                      'data-link-row': link.properties['data-link']
                    })
                  },
                  children: row.children.map(mapChild)
                },
                stylesheet,
                useInlineStyles,
                key: `code-segement${i}`
              })
            })
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {diff && (
        <React.Fragment>
          <hr />
          <pre className="diff">
            {diff.map((d, n) => (
              <span
                className={classNames({
                  added: d.added,
                  removed: d.removed
                })}
                key={n}
              >
                {d.value}
              </span>
            ))}
          </pre>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

class Highlighter extends React.Component {
  state = { error: null }
  componentDidCatch(error) {
    this.setState({ error })
  }
  render() {
    if (this.state.error) {
      return <pre>{this.props.fileInfo.code}</pre>
    }
    return <HighlighterInner {...this.props} />
  }
}

export default Highlighter

const matchRelPath = /^["']\..*['"]/

function mapChild(node, i, row) {
  if (i > 3) {
    const content = ((node.children || [])[0] || {}).value || ''
    if (
      // text content looks like a relative path
      content.match(matchRelPath) &&
      // prior node is a space
      ((row[i - 1].children || [])[0] || {}).value === ' ' &&
      // node 2 steps down is a `from` keyword
      ((row[i - 2].children || [])[0] || {}).value === 'from'
    ) {
      return {
        ...node,
        properties: {
          ...node.properties,
          'data-link': content.replace(/^['"]|['"]$/g, '')
        }
      }
    }
  }
  return node
}
