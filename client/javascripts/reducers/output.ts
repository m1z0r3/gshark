import { Action, ActionType } from '../actions/output'
import { initialState, State } from '../states/output'

export function outputReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.OUTPUT_CLEAR:
      return initialState
    case ActionType.OUTPUT_CHANGE_FILE:
      return { ...state, file: action.payload.file }
    case ActionType.OUTPUT_CHANGE_FORMAT:
      return { ...state, format: action.payload.format }
    default:
      return state
  }
}
