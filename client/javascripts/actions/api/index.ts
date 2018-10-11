import { ActionType as DDoSActionType, getDDoSDetection } from './ddos_detection'
import { ActionType as FilterActionType, getFilter } from './filter'
import { ActionType as FrowRateActionType, getFlowRate } from './flow_rate'
import { ActionType as PacketIntervalActionType, getPacketInterval } from './packet_interval'
import { ActionType as StatisticActionType, getStatistic } from './statistic'

export const ActionType = {
  ...DDoSActionType,
  ...FilterActionType,
  ...FrowRateActionType,
  ...PacketIntervalActionType,
  ...StatisticActionType,
}

export type ActionType =
  | DDoSActionType
  | FilterActionType
  | FrowRateActionType
  | PacketIntervalActionType
  | StatisticActionType

export interface Action {
  type: ActionType
  payload: any
}

export const actions = {
  getDDoSDetection,
  getFilter,
  getFlowRate,
  getPacketInterval,
  getStatistic,
}
