import { DDoSData, FlowRateData, PacketIntervalData, StatisticData } from '../types'

export interface State {
  flowData: FlowRateData
  statisticData: StatisticData
  intervalData: PacketIntervalData
  ddosData: DDoSData
  isChartOpen: boolean
  isLoading: boolean
  alert?: {
    type: 'success' | 'danger'
    message: string
  }
}

export const initialState: State = {
  flowData: { label: [], data: [] },
  statisticData: {
    protocol: { label: [], data: [], ratio: [] },
    ip: {
      all: { label: [], data: [], ratio: [] },
      black: { label: [], data: [], ratio: [] },
    },
    country: {
      all: { label: [], data: [], ratio: [] },
      black: { label: [], data: [], ratio: [] },
    },
  },
  intervalData: { intervals: [], freq: [] },
  ddosData: [],
  isChartOpen: false,
  isLoading: false,
}
