import addonAPI, { types } from '@storybook/addons'
import { Panel } from './presentationPanel'
import React from 'react'

const INITIAL_SCREEN = false

let addedTitle = false
let addedFullscreenListener = false

export default function registerPresentation({ brain, goToPanel, sourceData }) {
  const channel = addonAPI.getChannel()
  addonAPI.add('edumentab/presentation/panel', {
    type: types.TAB,
    title: 'Presentation',
    route: ({ storyId }) => `/presentation/${storyId}`,
    match: ({ viewMode }) => viewMode === 'presentation',
    // eslint-disable-next-line react/display-name
    render: ({ active }) => {
      if (!addedTitle && INITIAL_SCREEN) {
        document.body.insertAdjacentHTML(
          'beforeend',
          '<div class="presentation-title" alt="click to begin!" title="click to begin!" style="background-image: url(\'./pattern2.png\')" />'
        )
        document
          .querySelector('.presentation-title')
          .addEventListener('click', e => e.target.classList.add('dismissed'))
        addedTitle = true
      }
      if (!addedFullscreenListener) {
        document.body.addEventListener(
          'keydown',
          e => e.key === 'q' && toggleFullScreen()
        )
        addedFullscreenListener = true
      }
      return active
        ? React.createElement(Panel, {
            channel: addonAPI.getChannel(),
            goToPanel,
            brain,
            sourceData,
            active
          })
        : null
    }
  })
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
