import { Moment } from 'moment'
import * as React from 'react'
import { FormControl } from 'react-bootstrap'

import { PacketIntervalData, PacketIntervalQuery } from '../../types'
import SubmitButton from '../SubmitButton'
import PacketIntervalChart from './PacketIntervalChart'
import PacketIntervalFilter from './PacketIntervalFilter'

export default (props: {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
  onSubmit: (query: PacketIntervalQuery) => void
  query: PacketIntervalQuery
  isChartOpen: boolean
  chartData: PacketIntervalData
}) => {
  const onSubmit = () => {
    if (props.query.input.files.length === 0) {
      alert('pcapファイルを選択してください')
      return
    }
    return props.onSubmit(props.query)
  }
  return (
    <div>
      <PacketIntervalFilter
        onChangeProtocol={props.onChangeProtocol}
        onChangeSrcIp={props.onChangeSrcIp}
        onChangeDstIp={props.onChangeDstIp}
        onChangeSrcPort={props.onChangeSrcPort}
        onChangeDstPort={props.onChangeDstPort}
        onChangePeriodStart={props.onChangePeriodStart}
        onChangePeriodEnd={props.onChangePeriodEnd}
      />
      <SubmitButton onSubmit={onSubmit} />
      {props.isChartOpen && <PacketIntervalChart data={props.chartData} />}
    </div>
  )
}
