import * as React from 'react'
import { Line } from 'react-chartjs-2'

import { formatUnixTime } from '../../tools'
import { FlowRateData } from '../../types'

const chartData = (data: FlowRateData) => {
  const labels = data.label.length > 0 ? data.label.map(label => formatUnixTime(label)) : []
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
        data: data.data || [],
      },
    ],
  }
}

export default (props: { data: FlowRateData }) => (
  <div className="flow-rate-chart">
    <Line data={chartData(props.data)} />
  </div>
)
