import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { actions as appActions } from '../actions/app'
import { actions as filterActions } from '../actions/filter'
import PacketInterval from '../components/PacketInterval'
import { State } from '../states'

const actions = { ...appActions, ...filterActions }

const mapStateToProps = (state: State) => ({
  query: {
    input: state.input,
    filter: state.filter,
  },
  isChartOpen: state.app.isChartOpen,
  chartData: state.app.intervalData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeProtocol: bindActionCreators(actions, dispatch).changeProtocol,
  onChangeSrcIp: bindActionCreators(actions, dispatch).changeSrcIp,
  onChangeDstIp: bindActionCreators(actions, dispatch).changeDstIp,
  onChangeSrcPort: bindActionCreators(actions, dispatch).changeSrcPort,
  onChangeDstPort: bindActionCreators(actions, dispatch).changeDstPort,
  onChangePeriodStart: bindActionCreators(actions, dispatch).changePeriodStart,
  onChangePeriodEnd: bindActionCreators(actions, dispatch).changePeriodEnd,
  onSubmit: bindActionCreators(actions, dispatch).getPacketInterval,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PacketInterval)
