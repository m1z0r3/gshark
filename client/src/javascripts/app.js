import React from 'react'
import ReactDOM from 'react-dom'
import { PageHeader, Alert } from 'react-bootstrap'
import $ from 'jquery'
import ListDir from './components/ListDir'
import MainNav from './components/MainNav'
import DisplayFilter from './components/DisplayFilter'
import FlowRateChart from './components/FlowRateChart'
import StatisticChart from './components/StatisticChart'
import PacketIntervalChart from './components/PacketIntervalChart'

const camelToSnake = string => {
  return string.replace(/([A-Z])/g, s => '_' + s.charAt(0).toLowerCase())
}

class App extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      pcapFiles: [],
      displayFilter: {},
      mainNavState: 'flowRate',
      flowRateData: {},
      statisticData: {},
      packetIntervalData: {},
      filterData: {},
      isChartOpen: false,
      format: 'pcap',
      output_file: '',
      alertType: '',
      alertMessage: '',
    }
  }

  handleClickPcap(pcapFiles) {
    this.setState({ pcapFiles: pcapFiles })
  }

  handleSelectMainNav(eventKey) {
    this.setState({
      mainNavState: eventKey,
      displayFilter: {},
      isChartOpen: Object.keys(this.state[`${eventKey}Data`]).length > 0,
      alertType: '',
      alertMessage: '',
    })
  }

  handleChangeFilter(key, event) {
    if (key === 'format' || key === 'output_file') {
      this.setState({ [key]: event.target.value })
    } else {
      let displayFilter = JSON.parse(JSON.stringify(this.state.displayFilter))
      if (key === 'period_start' || key === 'period_end') {
        try {
          displayFilter[key] = event.unix()
        } catch (e) {
          delete displayFilter[key]
        }
      } else {
        if (event.target.value !== '') {
          displayFilter[key] = event.target.value
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
    let query =
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
      url: `/api/${camelToSnake(this.state.mainNavState)}`,
      type: this.state.mainNavState === 'filter' ? 'POST' : 'GGET',
      contentType: 'application/json',
      data: JSON.stringify(query),
      dataType: 'json',
      success: data => {
        let nextState =
          this.state.mainNavState === 'filter'
            ? data.succeeded
              ? { alertType: 'success', alertMessage: data.succeeded }
              : { alertType: 'danger', alertMessage: data.error }
            : { [`${this.state.mainNavState}Data`]: data, isChartOpen: true }
        this.setState(nextState)
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
        this.setState({ alertType: 'danger', alertMessage: err.toString() })
      },
    })
  }

  handleAlertDismiss() {
    this.setState({ alertType: '', alertMessage: '' })
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
        <MainNav onSelect={this.handleSelectMainNav.bind(this)} />
        <DisplayFilter
          mainNavState={this.state.mainNavState}
          onChange={this.handleChangeFilter.bind(this)}
          onSubmit={this.handleSubmitFilter.bind(this)}
        />
        {this.state.mainNavState === 'flowRate' ? (
          <FlowRateChart
            isChartOpen={this.state.isChartOpen}
            data={this.state.flowRateData}
          />
        ) : this.state.mainNavState === 'statistic' ? (
          <StatisticChart
            isChartOpen={this.state.isChartOpen}
            data={this.state.statisticData}
          />
        ) : this.state.mainNavState === 'packetInterval' ? (
          <PacketIntervalChart
            isChartOpen={this.state.isChartOpen}
            data={this.state.packetIntervalData}
          />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
