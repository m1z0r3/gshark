import { Moment } from 'moment'
import * as React from 'react'

import { StatisticData, StatisticQuery } from '../../types'
import SubmitButton from '../SubmitButton'
import StatisticBlackList from './StatisticBlackList'
import StatisticChart from './StatisticChart'
import StatisticFilter from './StatisticFilter'
import StatisticNav from './StatisticNav'

export type NavType = 'protocol' | 'ip' | 'country'

interface Props {
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
  onSubmit: (query: StatisticQuery) => void
  query: StatisticQuery
  isChartOpen: boolean
  chartData: StatisticData
}

interface State {
  navType: NavType
  onlyBlackList: boolean
}

export default class Statistic extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { navType: 'protocol', onlyBlackList: false }
    this.handleSelectNav = this.handleSelectNav.bind(this)
    this.handleCheckBlackList = this.handleCheckBlackList.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  public handleSelectNav(navType: NavType) {
    this.setState({ navType })
  }

  public handleCheckBlackList(checked: boolean) {
    this.setState({ onlyBlackList: checked })
  }

  public handleSubmit() {
    if (this.props.query.input.files.length === 0) {
      alert('pcapファイルを選択してください')
      return
    }
    return this.props.onSubmit(this.props.query)
  }

  public chartData() {
    switch (this.state.navType) {
      case 'protocol':
        return this.props.chartData.protocol
      case 'ip':
        return this.state.onlyBlackList
          ? this.props.chartData.ip.black
          : this.props.chartData.ip.all
      case 'country':
        return this.state.onlyBlackList
          ? this.props.chartData.country.black
          : this.props.chartData.country.all
      default:
        return { label: [], data: [], ratio: [] }
    }
  }

  public render() {
    return (
      <div>
        <StatisticFilter
          onChangePeriodStart={this.props.onChangePeriodStart}
          onChangePeriodEnd={this.props.onChangePeriodEnd}
        />
        <SubmitButton onSubmit={this.handleSubmit} />
        {this.props.isChartOpen && (
          <React.Fragment>
            <StatisticNav activeKey={this.state.navType} onSelect={this.handleSelectNav} />
            {(this.state.navType === 'ip' || this.state.navType === 'country') && (
              <StatisticBlackList onClick={this.handleCheckBlackList} />
            )}
            <StatisticChart data={this.chartData()} />
          </React.Fragment>
        )}
      </div>
    )
  }
}
