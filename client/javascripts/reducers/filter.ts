import * as moment from 'moment'

import { Action, ActionType } from '../actions/filter'
import { initialState, State } from '../states/filter'
import { Protocol } from '../types'

export function filterReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.FILTER_CLEAR:
      return initialState
    case ActionType.FILTER_CHANGE_PROTOCOL:
      return { ...state, protocol: action.payload.protocol as Protocol }
    case ActionType.FILTER_CHANGE_SRC_IP:
      return { ...state, ip: { ...state.ip, src: action.payload.ips } }
    case ActionType.FILTER_CHANGE_DST_IP:
      return { ...state, ip: { ...state.ip, dst: action.payload.ips } }
    case ActionType.FILTER_CHANGE_SRC_PORT:
      return { ...state, port: { ...state.port, src: action.payload.ports } }
    case ActionType.FILTER_CHANGE_DST_PORT:
      return { ...state, port: { ...state.port, dst: action.payload.ports } }
    case ActionType.FILTER_CHANGE_PERIOD_START:
      if (action.payload.time instanceof moment) {
        return { ...state, period: { ...state.period, start: action.payload.time.unix() } }
      }
      return { ...state, period: { ...state.period, start: undefined } }
    case ActionType.FILTER_CHANGE_PERIOD_END:
      if (action.payload.time instanceof moment) {
        return { ...state, period: { ...state.period, end: action.payload.time.unix() } }
      }
      return { ...state, period: { ...state.period, end: undefined } }
    default:
      return state
  }
}
