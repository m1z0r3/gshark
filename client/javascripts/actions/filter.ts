import { Moment } from 'moment'
import * as React from 'react'
import { FormControl } from 'react-bootstrap'

export enum ActionType {
  FILTER_CLEAR = 'FILTER_CLEAR',
  FILTER_CHANGE_PROTOCOL = 'FILTER_CHANGE_PROTOCOL',
  FILTER_CHANGE_SRC_IP = 'FILTER_CHANGE_SRC_IP',
  FILTER_CHANGE_DST_IP = 'FILTER_CHANGE_DST_IP',
  FILTER_CHANGE_SRC_PORT = 'FILTER_CHANGE_SRC_PORT',
  FILTER_CHANGE_DST_PORT = 'FILTER_CHANGE_DST_PORT',
  FILTER_CHANGE_PERIOD_START = 'FILTER_CHANGE_PERIOD_START',
  FILTER_CHANGE_PERIOD_END = 'FILTER_CHANGE_PERIOD_END',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  clearFilter: () => {
    return {
      type: ActionType.FILTER_CLEAR,
      payload: {},
    }
  },
  changeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => {
    return {
      type: ActionType.FILTER_CHANGE_PROTOCOL,
      payload: { protocol: event.currentTarget.value },
    }
  },
  changeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => {
    return {
      type: ActionType.FILTER_CHANGE_SRC_IP,
      payload: { ips: event.currentTarget.value.split(',').filter(Boolean) },
    }
  },
  changeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => {
    return {
      type: ActionType.FILTER_CHANGE_DST_IP,
      payload: { ips: event.currentTarget.value.split(',').filter(Boolean) },
    }
  },
  changeSrcPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => {
    return {
      type: ActionType.FILTER_CHANGE_SRC_PORT,
      payload: { ports: event.currentTarget.value.split(',').filter(Boolean) },
    }
  },
  changeDstPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => {
    return {
      type: ActionType.FILTER_CHANGE_DST_PORT,
      payload: { ports: event.currentTarget.value.split(',').filter(Boolean) },
    }
  },
  changePeriodStart: (time: string | Moment) => {
    return {
      type: ActionType.FILTER_CHANGE_PERIOD_START,
      payload: { time },
    }
  },
  changePeriodEnd: (time: string | Moment) => {
    return {
      type: ActionType.FILTER_CHANGE_PERIOD_END,
      payload: { time },
    }
  },
}
