import axios from 'axios'
import { Dispatch } from 'redux'

import { FilterData, FilterQuery } from '../../types'

const URL = '/api/filter'

export enum ActionType {
  API_FILTER_REQUEST = 'API_FILTER_REQUEST',
  API_FILTER_SUCCESS = 'API_FILTER_SUCCESS',
  API_FILTER_FAILURE = 'API_FILTER_FAILURE',
}

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  getFilterRequest: (): Action => {
    return {
      type: ActionType.API_FILTER_REQUEST,
      payload: {},
    }
  },
  getFilterSuccess: (data: FilterData): Action => {
    return {
      type: ActionType.API_FILTER_SUCCESS,
      payload: { data },
    }
  },
  getFilterFailure: (error: string): Action => {
    return {
      type: ActionType.API_FILTER_FAILURE,
      payload: { error },
    }
  },
}

export const getFilter = (query: FilterQuery) => {
  return (dispatch: Dispatch) => {
    dispatch(actions.getFilterRequest())
    return axios
      .post(URL, query)
      .then(response => dispatch(actions.getFilterSuccess(response.data)))
      .catch(error => dispatch(actions.getFilterFailure(error.toString())))
  }
}
