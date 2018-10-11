import { State } from './states'

export type Protocol = 'ip' | 'ipv6' | 'icmp' | 'tcp' | 'udp' | 'http' | 'dns' | 'ftp' | 'ssh'

export interface FlowRateQuery {
  input: State['input']
  filter: State['filter']
}

export interface StatisticQuery {
  input: State['input']
  filter: State['filter']
}

export interface PacketIntervalQuery {
  input: State['input']
  filter: State['filter']
}

export interface FilterQuery {
  input: State['input']
  filter: State['filter']
  output: State['output']
}

export interface DDoSQuery {
  input: State['input']
  window: State['ddos']['window']
  threshold: State['ddos']['threshold']
}

export interface FlowRateData {
  label: number[]
  data: number[]
}

export interface StatisticData {
  protocol: StatisticItemData
  ip: { all: StatisticItemData; black: StatisticItemData }
  country: { all: StatisticItemData; black: StatisticItemData }
}

export interface StatisticItemData {
  label: string[]
  data: number[]
  ratio: number[]
}

export interface PacketIntervalData {
  intervals: number[]
  freq: number[]
}

export interface FilterData {
  result: boolean
  message: string
}

export type DDoSData = {
  file: string
  dstip: string
  count: number
  start: number
  end: number
}[]
