import { Moment } from 'moment'
import * as React from 'react'
import { FormControl } from 'react-bootstrap'

import { FilterQuery, FlowRateData, FlowRateQuery } from '../../types'
import SubmitButton from '../SubmitButton'
import FlowRateChart from './FlowRateChart'
import FlowRateExport from './FlowRateExport'
import FlowRateFilter from './FlowRateFilter'

export default (props: {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
  onChangeOutput: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onSubmitFilter: (query: FlowRateQuery) => void
  onSubmitExport: (query: FilterQuery) => void
  query: FlowRateQuery
  filterQuery: FilterQuery
  isChartOpen: boolean
  chartData: FlowRateData
}) => {
  const onSubmitFilter = () => {
    if (props.query.input.files.length === 0) {
      alert('pcapファイルを選択してください')
      return
    }
    return props.onSubmitFilter(props.query)
  }
  const onSubmitExport = () => {
    if (!props.filterQuery.output.file) {
      alert('出力ファイル名を入力してください')
      return
    }
    return props.onSubmitExport(props.filterQuery)
  }
  return (
    <div>
      <FlowRateFilter
        onChangeProtocol={props.onChangeProtocol}
        onChangeSrcIp={props.onChangeSrcIp}
        onChangeDstIp={props.onChangeDstIp}
        onChangePeriodStart={props.onChangePeriodStart}
        onChangePeriodEnd={props.onChangePeriodEnd}
      />
      <SubmitButton onSubmit={onSubmitFilter} />
      {props.isChartOpen && (
        <React.Fragment>
          <FlowRateExport onChangeOutput={props.onChangeOutput} onSubmit={onSubmitExport} />
          <FlowRateChart data={props.chartData} />
        </React.Fragment>
      )}
    </div>
  )
}
