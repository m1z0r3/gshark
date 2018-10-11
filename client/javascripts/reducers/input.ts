import { Action, ActionType } from '../actions/input'
import { initialState, State } from '../states/input'

export function inputReducer(state: State = initialState, action: Action) {
  if (action.type === ActionType.INPUT_CHANGE_FILES) {
    return { files: action.payload.files }
  }
  return state
}
