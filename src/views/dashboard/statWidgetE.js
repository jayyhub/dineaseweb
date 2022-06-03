import React from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { CWidgetStatsE } from '@coreui/react'

function StatWidgetE() {
  return (
    <>
      <CWidgetStatsE
        className="m-1"
        //style={{ height: '86%', width: '100%' }}
        chart={
          <CChartBar
            className="mx-auto"
            style={{ height: '30px', width: '80px' }}
            data={{
              labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
              datasets: [
                {
                  backgroundColor: '#321fdb',
                  borderColor: 'transparent',
                  borderWidth: 1,
                  data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            }}
          />
        }
        title="Widget title"
        value="89.9%"
      />
    </>
  )
}

export default StatWidgetE
