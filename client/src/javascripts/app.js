// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { PageHeader, Alert } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import $ from 'jquery'
import moment from 'moment'
import ListDir from './components/ListDir'
import MainNav from './components/MainNav'
import DisplayFilter from './components/DisplayFilter'
import FlowRateChart from './components/FlowRateChart'
import StatisticChart from './components/StatisticChart'
import PacketIntervalChart from './components/PacketIntervalChart'

export type MainNavState = 'flow' | 'statistic' | 'interval' | 'filter'
export type FlowRateData = { label: number[], data: number[] }
export type StatisticData = { label: string[], data: number[], ratio: number[] }
export type PacketIntervalData = { intervals: number[], freq: number[] }

type Props = {}

type State = {
  pcapFiles: string[],
  displayFilter: { [string]: string },
  mainNavState: MainNavState,
  flowData: FlowRateData,
  statisticData: StatisticData,
  intervalData: PacketIntervalData,
  filterData: {},
  isChartOpen: boolean,
  format: string,
  output_file: string,
  alertType: '' | 'success' | 'danger',
  alertMessage: string,
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      pcapFiles: [],
      displayFilter: {},
      mainNavState: this.initialMainNavState(),
      flowData: { label: [], data: [] },
      statisticData: { label: [], data: [], ratio: [] },
      intervalData: { intervals: [], freq: [] },
      filterData: {},
      isChartOpen: false,
      format: 'pcap',
      output_file: '',
      alertType: '',
      alertMessage: '',
    }
  }

  initialMainNavState(): MainNavState {
    if (location.pathname === '/flow') {
      return 'flow'
    } else if (location.pathname === '/statistic') {
      return 'statistic'
    } else if (location.pathname === '/interval') {
      return 'interval'
    } else {
      return 'filter'
    }
  }

  apiEndpointUrl(): string {
    if (this.state.mainNavState === 'flow') {
      return '/api/flow_rate'
    } else if (this.state.mainNavState === 'statistic') {
      return '/api/statistic'
    } else if (this.state.mainNavState === 'interval') {
      return '/api/packet_interval'
    } else {
      return '/api/filter'
    }
  }

  handleClickPcap(pcapFiles: Array<string>) {
    this.setState({ pcapFiles: pcapFiles })
  }

  handleSelectMainNav(eventKey: MainNavState) {
    this.setState({
      mainNavState: eventKey,
      displayFilter: {},
      isChartOpen: false,
      alertType: '',
      alertMessage: '',
    })
  }

  handleChangeFilter(key, event) {
    if (key === 'format' || key === 'output_file') {
      this.setState({ [key]: event.currentTarget.value })
    } else {
      let displayFilter = JSON.parse(JSON.stringify(this.state.displayFilter))
      if (key === 'period_start' || key === 'period_end') {
        if (event instanceof moment) {
          displayFilter[key] = event.unix()
        } else {
          delete displayFilter[key]
        }
      } else {
        if (event.currentTarget.value !== '') {
          displayFilter[key] = event.currentTarget.value
        } else {
          delete displayFilter[key]
        }
      }
      this.setState({ displayFilter: displayFilter })
    }
  }

  handleSubmitFilter() {
    if (this.state.pcapFiles.length === 0) {
      alert('pcapファイルを選択してください')
      return
    }
    if (this.state.mainNavState === 'filter' && !this.state.output_file) {
      alert('出力ファイル名を入力してください')
      return
    }
    const url = this.apiEndpointUrl()
    const query =
      this.state.mainNavState === 'filter'
        ? {
            pcap_files: this.state.pcapFiles,
            display_filter: this.state.displayFilter,
            format: this.state.format,
            output_file: this.state.output_file,
          }
        : {
            pcap_files: this.state.pcapFiles,
            display_filter: this.state.displayFilter,
          }
    this.setState({ isChartOpen: false })
    $.ajax({
      url: url,
      type: this.state.mainNavState === 'filter' ? 'POST' : 'GGET',
      contentType: 'application/json',
      data: JSON.stringify(query),
      dataType: 'json',
      success: data => {
        const nextState =
          this.state.mainNavState === 'filter'
            ? data.succeeded
              ? { alertType: 'success', alertMessage: data.succeeded }
              : { alertType: 'danger', alertMessage: data.error }
            : { [`${this.state.mainNavState}Data`]: data, isChartOpen: true }
        this.setState(nextState)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString())
        this.setState({ alertType: 'danger', alertMessage: err.toString() })
      },
    })
  }

  handleAlertDismiss() {
    this.setState({ alertType: '', alertMessage: '' })
  }

  renderChart(path: MainNavState) {
    return () =>
      path === 'flow' ? (
        <FlowRateChart
          isChartOpen={this.state.isChartOpen}
          data={this.state.flowData}
        />
      ) : path === 'statistic' ? (
        <StatisticChart
          isChartOpen={this.state.isChartOpen}
          data={this.state.statisticData}
        />
      ) : path === 'interval' ? (
        <PacketIntervalChart
          isChartOpen={this.state.isChartOpen}
          data={this.state.intervalData}
        />
      ) : (
        <div />
      )
  }

  render() {
    return (
      <div className="container">
        <PageHeader>gshark</PageHeader>
        {this.state.alertType &&
          this.state.alertMessage && (
            <Alert
              bsStyle={this.state.alertType}
              onDismiss={this.handleAlertDismiss.bind(this)}
            >
              <strong>
                {this.state.alertType === 'success' ? 'Success: ' : 'Error: '}
              </strong>
              {this.state.alertMessage}
            </Alert>
          )}
        <ListDir onClickPcap={this.handleClickPcap.bind(this)} />
        <BrowserRouter>
          <div className="router-container">
            <MainNav onSelect={this.handleSelectMainNav.bind(this)} />
            <DisplayFilter
              mainNavState={this.state.mainNavState}
              onChange={this.handleChangeFilter.bind(this)}
              onSubmit={this.handleSubmitFilter.bind(this)}
            />
            <Switch>
              <Route path="/flow" render={this.renderChart('flow')} />
              <Route path="/statistic" render={this.renderChart('statistic')} />
              <Route path="/interval" render={this.renderChart('interval')} />
              <Route path="/filter" render={this.renderChart('filter')} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const app = document.getElementById('app')

if (app instanceof Element) {
  ReactDOM.render(<App />, app)
}
