import * as React from 'react'
import { Table } from 'react-bootstrap'

import { formatUnixTime, getFileNameFromFilePath } from '../../tools'
import { DDoSData } from '../../types'

export default (props: { data: DDoSData }) => (
  <div className="ddos-result">
    <Table striped={true} bordered={true} condensed={true} hover={true}>
      <thead>
        <tr>
          <th>#</th>
          <th>該当ファイル名</th>
          <th>宛先IPアドレス</th>
          <th>パケット数</th>
          <th>期間</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{getFileNameFromFilePath(item.file)}</td>
              <td>{item.dstip}</td>
              <td>{item.count}</td>
              <td>{`${formatUnixTime(item.start)} ~ ${formatUnixTime(item.end)}`}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  </div>
)
