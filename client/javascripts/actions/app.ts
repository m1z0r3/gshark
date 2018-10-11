import { actions as apiActions, ActionType as ApiActionType } from './api'

enum AppActionType {
  APP_CHANGE_MAIN_NAV = 'APP_CHANGE_MAIN_NAV',
  APP_CLOSE_ALERT = 'APP_CLOSE_ALERT',
  APP_CLOSE_LOADING_MODAL = 'APP_CLOSE_LOADING_MODAL',
}

export const ActionType = {
  ...ApiActionType,
  ...AppActionType,
}

type ActionType = ApiActionType | AppActionType

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  ...apiActions,
  changeMainNav: (): Action => {
    return {
      type: ActionType.APP_CHANGE_MAIN_NAV,
      payload: {},
    }
  },
  closeAlert: (): Action => {
    return {
      type: ActionType.APP_CLOSE_ALERT,
      payload: {},
    }
  },
  closeLoadingModal: (): Action => {
    return {
      type: ActionType.APP_CLOSE_LOADING_MODAL,
      payload: {},
    }
  },
}
