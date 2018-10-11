import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { actions as appActions } from '../actions/app'
import { actions as filterActions } from '../actions/filter'
import Statistic from '../components/Statistic'
import { State } from '../states'

const actions = { ...appActions, ...filterActions }

const mapStateToProps = (state: State) => ({
  query: {
    input: state.input,
    filter: state.filter,
  },
  isChartOpen: state.app.isChartOpen,
  chartData: state.app.statisticData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangePeriodStart: bindActionCreators(actions, dispatch).changePeriodStart,
  onChangePeriodEnd: bindActionCreators(actions, dispatch).changePeriodEnd,
  onSubmit: bindActionCreators(actions, dispatch).getStatistic,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistic)
