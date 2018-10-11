import { Protocol } from '../types'

export interface State {
  protocol?: Protocol
  ip?: {
    src?: string[]
    dst?: string[]
  }
  port?: {
    src?: number[]
    dst?: number[]
  }
  period?: {
    start?: number
    end?: number
  }
}

export const initialState: State = {}
