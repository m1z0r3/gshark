export enum ActionType {
  DDOS_CLEAR = 'DDOS_CLEAR',
  DDOS_CHANGE_TIME_WINDOW = 'DDOS_CHANGE_TIME_WINDOW',
  DDOS_CHANGE_THRESHOLD = 'DDOS_CHANGE_THRESHOLD',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  clearDDos: () => {
    return {
      type: ActionType.DDOS_CLEAR,
      payload: {},
    }
  },
  changeTimeWindow: (event: React.FormEvent<HTMLInputElement>): Action => {
    return {
      type: ActionType.DDOS_CHANGE_TIME_WINDOW,
      payload: { window: event.currentTarget.value },
    }
  },
  changeThreshold: (event: React.FormEvent<HTMLInputElement>): Action => {
    return {
      type: ActionType.DDOS_CHANGE_THRESHOLD,
      payload: { threshold: event.currentTarget.value },
    }
  },
}
