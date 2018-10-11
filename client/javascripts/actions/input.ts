export enum ActionType {
  INPUT_CHANGE_FILES = 'INPUT_CHANGE_FILES',
}

export interface Action {
  type: ActionType
  payload: {
    files: string[]
  }
}

export const actions = {
  changeInput: (files: string[]): Action => {
    return {
      type: ActionType.INPUT_CHANGE_FILES,
      payload: { files },
    }
  },
}
