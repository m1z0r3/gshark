import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const styles = {
  open: { marginTop: 50 },
  close: { display: 'none' },
}

export default class FlowRateChart extends React.Component {
  createData() {
    let labels = this.props.data.label
      ? this.props.data.label.map(label =>
          moment(label * 1000).format('YYYY/MM/DD HH:mm:ss'),
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
          data: this.props.data.data || [],
        },
      ],
    }
  }

  render() {
    return (
      <div class="FlowRateChart">
        <div style={this.props.isChartOpen ? styles.open : styles.close}>
          <Line data={this.createData()} />
        </div>
      </div>
    )
  }
}
