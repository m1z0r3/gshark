import { Moment } from 'moment'
import * as React from 'react'
import { FormControl } from 'react-bootstrap'

import { FilterQuery } from '../../types'
import SubmitButton from '../SubmitButton'
import ExportCommand from './ExportCommand'
import ExportFilter from './ExportFilter'

export default (props: {
  onChangeProtocol: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstIp: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeSrcPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeDstPort: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangePeriodStart: (event: string | Moment) => void
  onChangePeriodEnd: (event: string | Moment) => void
  onChangeFormat: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeOutput: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onSubmit: (query: FilterQuery) => void
  query: FilterQuery
}) => {
  const onSubmit = () => {
    if (props.query.input.files.length === 0) {
      alert('pcapファイルを選択してください')
      return
    }
    if (!props.query.output.file) {
      alert('出力ファイル名を入力してください')
      return
    }
    return props.onSubmit(props.query)
  }
  return (
    <div>
      <ExportFilter
        onChangeProtocol={props.onChangeProtocol}
        onChangeSrcIp={props.onChangeSrcIp}
        onChangeDstIp={props.onChangeDstIp}
        onChangeSrcPort={props.onChangeSrcPort}
        onChangeDstPort={props.onChangeDstPort}
        onChangePeriodStart={props.onChangePeriodStart}
        onChangePeriodEnd={props.onChangePeriodEnd}
        onChangeFormat={props.onChangeFormat}
        onChangeOutput={props.onChangeOutput}
      />
      <ExportCommand query={props.query} />
      <SubmitButton onSubmit={onSubmit} />
    </div>
  )
}
