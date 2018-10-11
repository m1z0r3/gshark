import { Action, ActionType } from '../actions/app'
import { initialState, State } from '../states/app'

type AlertType = 'success' | 'danger'

const createAlert = (type: AlertType, message: string) => ({ type, message })

export function appReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.API_DDOS_DETECTION_REQUEST:
    case ActionType.API_FILTER_REQUEST:
    case ActionType.API_FLOW_RATE_REQUEST:
    case ActionType.API_PACKET_INTERVAL_REQUEST:
    case ActionType.API_STATISTIC_REQUEST:
      return { ...state, isChartOpen: false, isLoading: true }
    case ActionType.API_DDOS_DETECTION_SUCCESS:
      return state.isLoading
        ? { ...state, isChartOpen: true, isLoading: false, ddosData: action.payload.data }
        : state
    case ActionType.API_FILTER_SUCCESS:
      const alertType = action.payload.data.result ? 'success' : 'danger'
      return {
        ...state,
        isChartOpen: false,
        isLoading: false,
        alert: createAlert(alertType, action.payload.data.message),
      }
    case ActionType.API_FLOW_RATE_SUCCESS:
      return state.isLoading
        ? { ...state, isChartOpen: true, isLoading: false, flowData: action.payload.data }
        : state
    case ActionType.API_PACKET_INTERVAL_SUCCESS:
      return state.isLoading
        ? { ...state, isChartOpen: true, isLoading: false, intervalData: action.payload.data }
        : state
    case ActionType.API_STATISTIC_SUCCESS:
      return state.isLoading
        ? { ...state, isChartOpen: true, isLoading: false, statisticData: action.payload.data }
        : state
    case ActionType.API_DDOS_DETECTION_FAILURE:
    case ActionType.API_FILTER_FAILURE:
    case ActionType.API_FLOW_RATE_FAILURE:
    case ActionType.API_PACKET_INTERVAL_FAILURE:
    case ActionType.API_STATISTIC_FAILURE:
      return {
        ...state,
        isChartOpen: false,
        isLoading: false,
        alert: createAlert('danger', action.payload.error),
      }
    case ActionType.APP_CHANGE_MAIN_NAV:
      return { ...state, isChartOpen: false, isLoading: false, alert: undefined }
    case ActionType.APP_CLOSE_ALERT:
      return { ...state, alert: undefined }
    case ActionType.APP_CLOSE_LOADING_MODAL:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
