const rule = {
  create: context => {
    const fileName = context.getFilename()
    const mayUse = fileName.match(/useDispatchWithSender|v0[1-8]/)
    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier') {
          if (node.callee.name === 'useDispatch' && !mayUse) {
            context.report({
              node,
              message: 'Should use useDispatchWithSender instead!'
            })
          }
          if (
            node.callee.name === 'useDispatchWithSender' &&
            node.arguments.length === 1 &&
            node.arguments[0].type === 'Literal' &&
            !fileName.match(node.arguments[0].value)
          ) {
            context.report({
              node,
              message:
                'useDispatchWithSender should be given sender matching filename!'
            })
          }
        }
      }
    }
  }
}

module.exports = rule
