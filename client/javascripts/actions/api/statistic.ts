import axios from 'axios'
import { Dispatch } from 'redux'

import { StatisticData, StatisticQuery } from '../../types'

const URL = '/api/statistic'

export enum ActionType {
  API_STATISTIC_REQUEST = 'API_STATISTIC_REQUEST',
  API_STATISTIC_SUCCESS = 'API_STATISTIC_SUCCESS',
  API_STATISTIC_FAILURE = 'API_STATISTIC_FAILURE',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  getStatisticRequest: (): Action => {
    return {
      type: ActionType.API_STATISTIC_REQUEST,
      payload: {},
    }
  },
  getStatisticSuccess: (data: StatisticData): Action => {
    return {
      type: ActionType.API_STATISTIC_SUCCESS,
      payload: { data },
    }
  },
  getStatisticFailure: (error: string): Action => {
    return {
      type: ActionType.API_STATISTIC_FAILURE,
      payload: { error },
    }
  },
}

export const getStatistic = (query: StatisticQuery) => {
  return (dispatch: Dispatch) => {
    dispatch(actions.getStatisticRequest())
    return axios
      .post(URL, query)
      .then(response => dispatch(actions.getStatisticSuccess(response.data)))
      .catch(error => dispatch(actions.getStatisticFailure(error.toString())))
  }
}
