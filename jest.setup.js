// https://stackoverflow.com/questions/42213522/mocking-document-createrange-for-jest

global.Range = function Range() {}

const createContextualFragment = html => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.children[0] // so hokey it's not even funny
}

Range.prototype.createContextualFragment = html =>
  createContextualFragment(html)

document.createRange = () => ({
  setEnd: () => {},
  setStart: () => {},
  getBoundingClientRect: () => ({ right: 0 }),
  getClientRects: () => [],
  createContextualFragment,
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
})
