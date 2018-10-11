import { State as AppState } from './app'
import { State as DDoSState } from './ddos'
import { State as FilterState } from './filter'
import { State as InputState } from './input'
import { State as OutputState } from './output'

export interface State {
  app: AppState
  ddos: DDoSState
  filter: FilterState
  input: InputState
  output: OutputState
}

export default State
