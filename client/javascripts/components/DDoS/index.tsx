import * as React from 'react'
import { FormControl } from 'react-bootstrap'

import { DDoSData, DDoSQuery } from '../../types'
import SubmitButton from '../SubmitButton'
import DDoSCondition from './DDoSCondition'
import DDoSResult from './DDoSResult'

export default (props: {
  onChangeTimeWindow: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onChangeThreshold: (event: React.FormEvent<FormControl & HTMLInputElement>) => void
  onSubmit: (query: DDoSQuery) => void
  query: DDoSQuery
  isChartOpen: boolean
  data: DDoSData
}) => {
  const onSubmit = () => {
    if (props.query.input.files.length === 0) {
      alert('pcapファイルを選択してください')
      return
    }
    if (!props.query.window) {
      alert('タイムウィンドウを指定してください')
      return
    }
    if (!props.query.threshold) {
      alert('しきい値を指定してください')
      return
    }
    return props.onSubmit(props.query)
  }
  return (
    <div>
      <DDoSCondition
        onChangeTimeWindow={props.onChangeTimeWindow}
        onChangeThreshold={props.onChangeThreshold}
      />
      <SubmitButton onSubmit={onSubmit} />
      {props.isChartOpen && <DDoSResult data={props.data} />}
    </div>
  )
}
