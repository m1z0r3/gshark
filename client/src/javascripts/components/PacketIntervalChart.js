// @flow
import React from 'react'
import { Line } from 'react-chartjs-2'
import type { PacketIntervalData } from '../app'

const styles = {
  open: { marginTop: 50 },
  close: { display: 'none' },
}

type Props = {
  isChartOpen: boolean,
  data: PacketIntervalData,
}

export default class PacketIntervalChart extends React.Component<Props> {
  createData() {
    const intervals = this.props.data.intervals
    const labels =
      intervals.length > 0
        ? intervals
            .slice(0, intervals.length - 1)
            .map(
              (interval, index) =>
                `${interval.toFixed(4)} ~ ${intervals[index + 1].toFixed(4)}`,
            )
        : []
    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of packets',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.data.freq || [],
        },
      ],
    }
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.isChartOpen !== this.props.isChartOpen
  }

  render() {
    return (
      <div className="PacketIntervalChart">
        <div style={this.props.isChartOpen ? styles.open : styles.close}>
          <Line data={this.createData()} />
        </div>
      </div>
    )
  }
}
