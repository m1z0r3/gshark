import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { actions as appActions } from '../actions/app'
import { actions as filterActions } from '../actions/filter'
import { actions as outputActions } from '../actions/output'
import Export from '../components/Export'
import { State } from '../states'

const actions = { ...appActions, ...filterActions, ...outputActions }

const mapStateToProps = (state: State) => ({
  query: {
    input: state.input,
    filter: state.filter,
    output: state.output,
  },
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeProtocol: bindActionCreators(actions, dispatch).changeProtocol,
  onChangeSrcIp: bindActionCreators(actions, dispatch).changeSrcIp,
  onChangeDstIp: bindActionCreators(actions, dispatch).changeDstIp,
  onChangeSrcPort: bindActionCreators(actions, dispatch).changeSrcPort,
  onChangeDstPort: bindActionCreators(actions, dispatch).changeDstPort,
  onChangePeriodStart: bindActionCreators(actions, dispatch).changePeriodStart,
  onChangePeriodEnd: bindActionCreators(actions, dispatch).changePeriodEnd,
  onChangeFormat: bindActionCreators(actions, dispatch).changeFormat,
  onChangeOutput: bindActionCreators(actions, dispatch).changeOutput,
  onSubmit: bindActionCreators(actions, dispatch).getFilter,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Export)
