import axios from 'axios'
import { Dispatch } from 'redux'

import { PacketIntervalData, PacketIntervalQuery } from '../../types'

const URL = '/api/packet_interval'

export enum ActionType {
  API_PACKET_INTERVAL_REQUEST = 'API_PACKET_INTERVAL_REQUEST',
  API_PACKET_INTERVAL_SUCCESS = 'API_PACKET_INTERVAL_SUCCESS',
  API_PACKET_INTERVAL_FAILURE = 'API_PACKET_INTERVAL_FAILURE',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  getPacketIntervalRequest: (): Action => {
    return {
      type: ActionType.API_PACKET_INTERVAL_REQUEST,
      payload: {},
    }
  },
  getPacketIntervalSuccess: (data: PacketIntervalData): Action => {
    return {
      type: ActionType.API_PACKET_INTERVAL_SUCCESS,
      payload: { data },
    }
  },
  getPacketIntervalFailure: (error: string): Action => {
    return {
      type: ActionType.API_PACKET_INTERVAL_FAILURE,
      payload: { error },
    }
  },
}

export const getPacketInterval = (query: PacketIntervalQuery) => {
  return (dispatch: Dispatch) => {
    dispatch(actions.getPacketIntervalRequest())
    return axios
      .post(URL, query)
      .then(response => dispatch(actions.getPacketIntervalSuccess(response.data)))
      .catch(error => dispatch(actions.getPacketIntervalFailure(error.toString())))
  }
}
