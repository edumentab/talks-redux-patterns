const rule = require('./use-dispatch-with-sender.rule')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: require.resolve('babel-eslint')
})

const wrongHookError = {
  message: 'Should use useDispatchWithSender instead!'
}

const wrongNameError = {
  message: 'useDispatchWithSender should be given sender matching filename!'
}

ruleTester.run('use-dispatch-with-sender', rule, {
  valid: [
    // ok since some other hook
    {
      code: 'useDispute()',
      filename: 'src/v10/foo.js'
    },
    // ok since filename matches sender
    {
      code: 'useDispatchWithSender("Hello")',
      filename: 'blarp/Hello.tsx'
    },
    // ok since this file defines useDispatchWithSender
    {
      code: 'useDispatch()',
      filename: 'useDispatchWithSender.ts'
    },
    // ok since used before useDispatchWithSender was introduced
    {
      code: 'useDispatch()',
      filename: 'src/v04/foo.js'
    }
  ],
  invalid: [
    {
      code: 'useDispatch()',
      filename: 'src/v10/foo.js',
      errors: [wrongHookError]
    },
    {
      code: 'useDispatchWithSender("sclpg")',
      filename: 'blarp',
      errors: [wrongNameError]
    }
  ]
})
