import * as React from 'react'
import { PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'

import Alert from './components/Alert'
import LoadingModal from './components/LoadingModal'
import MainNav from './components/MainNav'
import DDoS from './containers/DDoS'
import Export from './containers/Export'
import FileList from './containers/FileList'
import FlowRate from './containers/FlowRate'
import PacketInterval from './containers/PacketInterval'
import Statistic from './containers/Statistic'

import { actions as appActions } from './actions/app'
import { actions as filterActions } from './actions/filter'
import { actions as outputActions } from './actions/output'
import { State } from './states'

const actions = { ...appActions, ...filterActions, ...outputActions }

interface Props {
  app: State['app']
  changeMainNav: () => void
  clearFilter: () => void
  clearOutput: () => void
  handleAlertDismiss: () => void
  handleCloseLoadingModal: () => void
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.handleSelectMainNav = this.handleSelectMainNav.bind(this)
  }

  public handleSelectMainNav() {
    this.props.changeMainNav()
    this.props.clearFilter()
    this.props.clearOutput()
  }

  public render() {
    return (
      <div className="container">
        <PageHeader>gshark</PageHeader>
        {this.props.app.alert && (
          <Alert
            alertType={this.props.app.alert.type}
            message={this.props.app.alert.message}
            onDismiss={this.props.handleAlertDismiss}
          />
        )}
        <FileList />
        <BrowserRouter>
          <div className="router-container">
            <MainNav onSelect={this.handleSelectMainNav} />
            <Switch>
              <Route path="/flow" component={FlowRate} />
              <Route path="/statistic" component={Statistic} />
              <Route path="/interval" component={PacketInterval} />
              <Route path="/filter" component={Export} />
              <Route path="/ddos" component={DDoS} />
            </Switch>
            <LoadingModal
              isOpen={this.props.app.isLoading}
              handleClose={this.props.handleCloseLoadingModal}
            />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  app: state.app,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeMainNav: bindActionCreators(actions, dispatch).changeMainNav,
  clearFilter: bindActionCreators(actions, dispatch).clearFilter,
  clearOutput: bindActionCreators(actions, dispatch).clearOutput,
  handleAlertDismiss: bindActionCreators(actions, dispatch).closeAlert,
  handleCloseLoadingModal: bindActionCreators(actions, dispatch).closeLoadingModal,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
