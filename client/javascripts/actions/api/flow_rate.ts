import axios from 'axios'
import { Dispatch } from 'redux'

import { FlowRateData, FlowRateQuery } from '../../types'

const URL = '/api/flow_rate'

export enum ActionType {
  API_FLOW_RATE_REQUEST = 'API_FLOW_RATE_REQUEST',
  API_FLOW_RATE_SUCCESS = 'API_FLOW_RATE_SUCCESS',
  API_FLOW_RATE_FAILURE = 'API_FLOW_RATE_FAILURE',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  getFlowRateRequest: (): Action => {
    return {
      type: ActionType.API_FLOW_RATE_REQUEST,
      payload: {},
    }
  },
  getFlowRateSuccess: (data: FlowRateData): Action => {
    return {
      type: ActionType.API_FLOW_RATE_SUCCESS,
      payload: { data },
    }
  },
  getFlowRateFailure: (error: string): Action => {
    return {
      type: ActionType.API_FLOW_RATE_FAILURE,
      payload: { error },
    }
  },
}

export const getFlowRate = (query: FlowRateQuery) => {
  return (dispatch: Dispatch) => {
    dispatch(actions.getFlowRateRequest())
    return axios
      .post(URL, query)
      .then(response => dispatch(actions.getFlowRateSuccess(response.data)))
      .catch(error => dispatch(actions.getFlowRateFailure(error.toString())))
  }
}
