import { matchPathToFile } from './matchPathToFile'
import produce from 'immer'

function map(state) {
  const {
    code: { history, idx }
  } = state
  return {
    ...state,
    code: {
      ...history[idx],
      canGoBack: idx > 0,
      canGoForward: idx < history.length - 1
    }
  }
}

export function initBrain(sourceData) {
  const brainId = Math.random()
  let subscribers = []
  let state = {
    code: {
      history: [
        {
          file: '',
          version: sourceData.versions[0]
        }
      ],
      idx: 0
    }
  }

  function notify() {
    const mappedState = map(state)
    for (const subscriber of subscribers) {
      subscriber(mappedState)
    }
  }

  return {
    getState() {
      return map(state)
    },
    subscribe(fn) {
      subscribers.push(fn)
    },
    unsubscribe(fn) {
      subscribers = subscribers.filter(_fn => _fn !== fn)
    },
    goForward() {
      state = produce(state, draft => {
        draft.code.idx = Math.min(
          draft.code.idx + 1,
          draft.code.history.length - 1
        )
      })
      notify()
    },
    goBack() {
      state = produce(state, draft => {
        draft.code.idx = Math.max(0, draft.code.idx - 1)
      })
      notify()
    },
    clickLink(path) {
      const {
        code: { history, idx }
      } = state
      const { file: oldFile, version: oldVersion } = history[idx] || {}
      const { file, version } =
        matchPathToFile({
          sourceData,
          path,
          file: oldFile,
          version: oldVersion
        }) || {}
      if (file && !(file === oldFile && version === oldVersion)) {
        let newHistory, newIdx
        if (history.length === 1 && !history[0].file) {
          newHistory = [{ file, version }]
          newIdx = 0
        } else {
          newHistory = history.slice(0, idx + 1).concat({ file, version })
          newIdx = newHistory.length - 1
        }
        state = produce(state, draft => {
          draft.code = { history: newHistory, idx: newIdx }
        })
        notify()
      } else {
        console.warn('WARNING! Failed to find file', path)
      }
    },
    brainId
  }
}
