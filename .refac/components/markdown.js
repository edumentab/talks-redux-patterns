import React, { useCallback } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import './markdown.css'

export const Markdown = props => {
  const { markdown, onLinkClick } = props
  const handleClick = useCallback(
    e => {
      const link = e.target.closest('[data-file-link]')
      if (link) {
        onLinkClick(link.getAttribute('data-file-link'))
      }
    },
    [onLinkClick]
  )
  return (
    <div onClick={handleClick} className="markdownContent">
      <ReactMarkdown source={markdown} escapeHtml={false} />
    </div>
  )
}
