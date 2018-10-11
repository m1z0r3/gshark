import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { actions } from '../actions/input'
import FileList from '../components/FileList'
import { State } from '../states'

const mapStateToProps = (_: State) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickPcap: bindActionCreators(actions, dispatch).changeInput,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileList)
