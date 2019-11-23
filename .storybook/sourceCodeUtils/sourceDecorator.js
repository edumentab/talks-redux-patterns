import addons, { makeDecorator } from '@storybook/addons'

export default makeDecorator({
  name: 'withSourceInfo',
  parameterName: 'sourceCode',
  wrapper: (getStory, context) => {
    const channel = addons.getChannel()
    // this emissions is subscribed to in the registry and passed on to the sourceCode brain
    const version = context.name.split(' - ')[0]
    channel.emit('sourceCode/selectedVersion', version)
    return getStory(context)
  }
})
