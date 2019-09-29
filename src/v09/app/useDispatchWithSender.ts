import { useDispatch } from 'react-redux'
import { AppAction } from '../redux'

export const useDispatchWithSender = (sender: string) => {
  const originalDispatch = useDispatch()
  return (action: AppAction) => {
    action.sender = `VIEW(${sender})`
    return originalDispatch(action)
  }
}
