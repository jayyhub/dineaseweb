import React from 'react'
import { CWidgetStatsA } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilArrowBottom } from '@coreui/icons'

function StatWidgetA(props) {
  let d = { ...props }

  return (
    <>
      <CWidgetStatsA
        className="m-1"
        color="danger"
        value={
          <>
            PKR{d.value}{' '}
            {d.value > d.value1 ? (
              <span className="fs-6 fw-normal">
                ({d.value1} <CIcon icon={cilArrowBottom} />)
              </span>
            ) : (
              <span className="fs-6 fw-normal">
                ({d.value1} <CIcon icon={cilArrowTop} />)
              </span>
            )}
          </>
        }
        title={d.text}
        chart={
          <CChartBar
            className="mt-3 mx-3"
            style={{ height: '40px' }}
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
                'January',
                'February',
                'March',
                'April',
              ],
              datasets: [
                {
                  label: 'Last 10 days sale',
                  backgroundColor: 'rgba(255,255,255,.2)',
                  borderColor: 'rgba(255,255,255,.55)',
                  data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                  barPercentage: 0.6,
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
                  grid: {
                    display: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              },
            }}
          />
        }
      />
    </>
  )
}

export default StatWidgetA
