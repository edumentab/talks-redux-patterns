const { matchPathToFile } = require('./matchPathToFile')

const sourceData = {
  files: {
    'foo/gnurp.js': {},
    'bar/index.ts': {},
    'baz/blarp.js': {}
  },
  versions: ['v01', 'v02'],
  root: 'poop/src'
}

const testCases = {
  'exact path': {
    input: {
      path: 'foo/gnurp.js',
      version: 'v02'
    },
    expected: {
      file: 'foo/gnurp.js',
      version: 'v02'
    }
  },
  'with folder and version': {
    input: {
      path: 'src/v01/foo/gnurp.js',
      version: 'v02'
    },
    expected: {
      file: 'foo/gnurp.js',
      version: 'v01'
    }
  },
  'missing extension': {
    input: {
      path: 'src/v01/foo/gnurp',
      version: 'v01'
    },
    expected: {
      file: 'foo/gnurp.js',
      version: 'v01'
    }
  },
  'index folder': {
    input: {
      path: 'bar',
      version: 'v02'
    },
    expected: {
      file: 'bar/index.ts',
      version: 'v02'
    }
  },
  'index folder with trailing slash': {
    input: {
      path: 'bar/',
      version: 'v02'
    },
    expected: {
      file: 'bar/index.ts',
      version: 'v02'
    }
  },
  'relative to other file': {
    input: {
      file: 'foo/gnurp.js',
      path: '../baz/blarp',
      version: 'v03'
    },
    expected: {
      file: 'baz/blarp.js',
      version: 'v03'
    }
  }
}

describe('the matchPathToFile function', () => {
  for (const [key, val] of Object.entries(testCases)) {
    it(`handles testcase "${key}"`, () => {
      expect(matchPathToFile({ sourceData, ...val.input })).toEqual(
        val.expected
      )
    })
  }
})
