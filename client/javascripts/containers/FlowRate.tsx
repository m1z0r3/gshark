import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { actions as appActions } from '../actions/app'
import { actions as filterActions } from '../actions/filter'
import { actions as outputActions } from '../actions/output'
import FlowRate from '../components/FlowRate'
import { State } from '../states'

const actions = { ...appActions, ...filterActions, ...outputActions }

const mapStateToProps = (state: State) => ({
  query: {
    input: state.input,
    filter: state.filter,
  },
  filterQuery: {
    input: state.input,
    filter: state.filter,
    output: { file: state.output.file, format: 'pcap' },
  },
  isChartOpen: state.app.isChartOpen,
  chartData: state.app.flowData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeProtocol: bindActionCreators(actions, dispatch).changeProtocol,
  onChangeSrcIp: bindActionCreators(actions, dispatch).changeSrcIp,
  onChangeDstIp: bindActionCreators(actions, dispatch).changeDstIp,
  onChangePeriodStart: bindActionCreators(actions, dispatch).changePeriodStart,
  onChangePeriodEnd: bindActionCreators(actions, dispatch).changePeriodEnd,
  onChangeOutput: bindActionCreators(actions, dispatch).changeOutput,
  onSubmitFilter: bindActionCreators(actions, dispatch).getFlowRate,
  onSubmitExport: bindActionCreators(actions, dispatch).getFilter,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlowRate)
