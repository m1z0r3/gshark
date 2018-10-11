import * as React from 'react'
import { Table } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'

import { StatisticItemData } from '../../types'

const MAX_RANK = 5

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#61D836', '#4BC0C0', '#b3b5b5']

const statisticLabels = (label: string[]) => {
  return label.slice(0, MAX_RANK).concat(['その他'])
}

const statisticData = (data: number[]) => {
  return data
    .slice(0, MAX_RANK)
    .concat([data.slice(MAX_RANK, data.length).reduce((prev, current) => prev + current)])
}

const chartData = (data: StatisticItemData) => {
  const labels = data.label.length > MAX_RANK ? statisticLabels(data.label) : data.label
  const datasets = data.data.length > MAX_RANK ? statisticData(data.data) : data.data
  return {
    labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  }
}

export default (props: { data: StatisticItemData }) => (
  <div className="statistic-chart">
    <Pie data={chartData(props.data)} />
    <div className="statistic-chart__table">
      <Table striped={true} bordered={true} condensed={true} hover={true}>
        <thead>
          <tr>
            <th>#</th>
            <th>プロトコル</th>
            <th>パケット数</th>
            <th>割合 [%]</th>
          </tr>
        </thead>
        <tbody>
          {props.data.label.map((label, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{label}</td>
                <td>{props.data.data[index]}</td>
                <td>{props.data.ratio[index].toFixed(3)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  </div>
)
