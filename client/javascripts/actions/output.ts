export enum ActionType {
  OUTPUT_CLEAR = 'OUTPUT_CLEAR',
  OUTPUT_CHANGE_FILE = 'OUTPUT_CHANGE_FILE',
  OUTPUT_CHANGE_FORMAT = 'OUTPUT_CHANGE_FORMAT',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  clearOutput: () => {
    return {
      type: ActionType.OUTPUT_CLEAR,
      payload: {},
    }
  },
  changeOutput: (event: React.FormEvent<HTMLInputElement>): Action => {
    return {
      type: ActionType.OUTPUT_CHANGE_FILE,
      payload: { file: event.currentTarget.value },
    }
  },
  changeFormat: (event: React.FormEvent<HTMLInputElement>): Action => {
    return {
      type: ActionType.OUTPUT_CHANGE_FORMAT,
      payload: { format: event.currentTarget.value },
    }
  },
}
