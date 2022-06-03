import React from 'react'
import { CChartDoughnut } from '@coreui/react-chartjs'

function DoughnutChart(props) {
  let p = { ...props }
  console.log(p)
  let list_of_colors = ['#FF6363', '#FCD900', '#4E944F', '#4B7BE5']
  let color

  if (p.value[0] / p.value[1] <= 0.25) {
    color = '#FF6363'
  } else if (p.value[0] / p.value[1] <= 0.5) {
    color = '#FCD900'
  } else if (p.value[0] / p.value[1] <= 0.75) {
    color = '#4E944F'
  } else if (p.value[0] / p.value[1] <= 1) {
    color = '#4B7BE5'
  } else {
    console.log('ERROR')
  }

  return (
    <div
      style={{
        //backgroundColor: 'purple',
        height: '78%',
        width: '78%',
      }}
    >
      <CChartDoughnut
        data={{
          datasets: [
            {
              backgroundColor: [color, '#FFFFFF'],
              data: [p.value[0], p.value[1] - p.value[0]],
            },
          ],
        }}
      />
      <h6 style={{ textAlign: 'center' }}>{p.text}</h6>
    </div>
  )
}

export default DoughnutChart
