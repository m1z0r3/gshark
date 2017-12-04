// @flow
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Table } from 'react-bootstrap'
import type { StatisticData } from '../app'

const MAX_RANK = 5

const styles = {
  open: { marginTop: 50 },
  close: { display: 'none' },
}

const colors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#61D836',
  '#4BC0C0',
  '#b3b5b5',
]

type Props = {
  isChartOpen: boolean,
  data: StatisticData,
}

export default class StatisticChart extends React.Component<Props> {
  createData() {
    const labels =
      this.props.data.label.length > MAX_RANK
        ? this.props.data.label.slice(0, MAX_RANK).concat(['その他'])
        : this.props.data.label
    const data =
      this.props.data.data.length > MAX_RANK
        ? this.props.data.data
            .slice(0, MAX_RANK)
            .concat([
              this.props.data.data
                .slice(MAX_RANK, this.props.data.data.length)
                .reduce((prev, current) => prev + current),
            ])
        : this.props.data.data
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    }
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.isChartOpen !== this.props.isChartOpen
  }

  render() {
    return (
      <div className="StatisticChart">
        <div style={this.props.isChartOpen ? styles.open : styles.close}>
          <Pie data={this.createData()} />
          <div className="StatisticChartTable">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>プロトコル</th>
                  <th>パケット数</th>
                  <th>割合 [%]</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.label.map((label, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{label}</td>
                      <td>{this.props.data.data[index]}</td>
                      <td>{this.props.data.ratio[index].toFixed(3)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}
