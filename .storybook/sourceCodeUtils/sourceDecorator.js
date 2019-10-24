import addons, { makeDecorator } from '@storybook/addons'

export default makeDecorator({
  name: 'withSourceInfo',
  parameterName: 'sourceCode',
  wrapper: (getStory, context) => {
    const channel = addons.getChannel()
    // this emissions is subscribed to in the registry and passed on to the sourceCode brain
    channel.emit(
      'sourceCode/selectedStory',
      context.parameters.fileName.toString().replace(/^\.\//, '')
    )
    return getStory(context)
  }
})
