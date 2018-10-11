import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { actions as appActions } from '../actions/app'
import { actions as ddosActions } from '../actions/ddos'
import DDoS from '../components/DDoS'
import { State } from '../states'

const actions = { ...appActions, ...ddosActions }

const mapStateToProps = (state: State) => ({
  query: {
    input: state.input,
    window: state.ddos.window,
    threshold: state.ddos.threshold,
  },
  isChartOpen: state.app.isChartOpen,
  data: state.app.ddosData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeTimeWindow: bindActionCreators(actions, dispatch).changeTimeWindow,
  onChangeThreshold: bindActionCreators(actions, dispatch).changeThreshold,
  onSubmit: bindActionCreators(actions, dispatch).getDDoSDetection,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DDoS)
