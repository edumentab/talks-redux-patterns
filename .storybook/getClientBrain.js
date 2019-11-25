import { initBrain } from '../.refac/initBrain'
import sourceData from './sourceCodeUtils/_sourceCodes.json'

let brain = initBrain(sourceData)

export default function getClientBrain() {
  return brain
}
