import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'

function BarChart() {
  return (
    <CChartBar
      data={{
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20],
          },
        ],
      }}
      labels="months"
    />
  )
}

export default BarChart
