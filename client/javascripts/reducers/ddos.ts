import { Action, ActionType } from '../actions/ddos'
import { initialState, State } from '../states/ddos'

export function ddosReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.DDOS_CLEAR:
      return initialState
    case ActionType.DDOS_CHANGE_TIME_WINDOW:
      return { ...state, window: action.payload.window }
    case ActionType.DDOS_CHANGE_THRESHOLD:
      return { ...state, threshold: action.payload.threshold }
    default:
      return state
  }
}
