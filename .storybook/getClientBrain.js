import { initBrain } from '../.refac/initBrain'
import sourceData from './sourceCodeUtils/_sourceCodes.json'

export default function getClientBrain(who) {
  console.log(who, 'asked for brain', !!window)
  if (window.brain) {
    console.log('returning existing brain', window.brain.brainId)
    return window.brain
  }
  window.brain = initBrain(sourceData)
  console.log('Made new brain!', window.brain.brainId)
  return window.brain
}
