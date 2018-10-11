import * as React from 'react'
import { Line } from 'react-chartjs-2'

import { PacketIntervalData } from '../../types'

const packetIntervalLabels = (intervals: number[]) => {
  return intervals
    .slice(0, intervals.length - 1)
    .map((interval, index) => `${interval.toFixed(4)} ~ ${intervals[index + 1].toFixed(4)}`)
}

const chartData = (data: PacketIntervalData) => {
  const labels = data.intervals.length > 0 ? packetIntervalLabels(data.intervals) : []
  return {
    labels,
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
        data: data.freq || [],
      },
    ],
  }
}

export default (props: { data: PacketIntervalData }) => (
  <div className="packet-interval-chart">
    <Line data={chartData(props.data)} />
  </div>
)
