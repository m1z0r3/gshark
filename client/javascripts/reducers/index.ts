import { appReducer } from './app'
import { ddosReducer } from './ddos'
import { filterReducer } from './filter'
import { inputReducer } from './input'
import { outputReducer } from './output'

const reducers = {
  app: appReducer,
  ddos: ddosReducer,
  filter: filterReducer,
  input: inputReducer,
  output: outputReducer,
}

export default reducers
