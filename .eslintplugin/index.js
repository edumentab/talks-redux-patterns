const JSX_no_length_truthiness = require('./jsx-no-length-truthiness/jsx-no-length-truthiness.rule')
const use_dispatch_with_sender = require('./use-dispatch-with-sender/use-dispatch-with-sender.rule')

exports.rules = {
  'jsx-no-length-truthiness': JSX_no_length_truthiness,
  'use-dispatch-with-sender': use_dispatch_with_sender
}
