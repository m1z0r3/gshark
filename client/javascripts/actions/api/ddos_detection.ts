import axios from 'axios'
import { Dispatch } from 'redux'

import { DDoSData, DDoSQuery } from '../../types'

const URL = '/api/ddos_detection'

export enum ActionType {
  API_DDOS_DETECTION_REQUEST = 'API_DDOS_DETECTION_REQUEST',
  API_DDOS_DETECTION_SUCCESS = 'API_DDOS_DETECTION_SUCCESS',
  API_DDOS_DETECTION_FAILURE = 'API_DDOS_DETECTION_FAILURE',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  getDDoSDetectionRequest: (): Action => {
    return {
      type: ActionType.API_DDOS_DETECTION_REQUEST,
      payload: {},
    }
  },
  getDDoSDetectionSuccess: (data: DDoSData): Action => {
    return {
      type: ActionType.API_DDOS_DETECTION_SUCCESS,
      payload: { data },
    }
  },
  getDDoSDetectionFailure: (error: string): Action => {
    return {
      type: ActionType.API_DDOS_DETECTION_FAILURE,
      payload: { error },
    }
  },
}

export const getDDoSDetection = (query: DDoSQuery) => {
  return (dispatch: Dispatch) => {
    dispatch(actions.getDDoSDetectionRequest())
    return axios
      .post(URL, query)
      .then(response => dispatch(actions.getDDoSDetectionSuccess(response.data)))
      .catch(error => dispatch(actions.getDDoSDetectionFailure(error.toString())))
  }
}
