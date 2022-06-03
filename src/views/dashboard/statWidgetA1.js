import React from 'react'
import { CWidgetStatsA } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'

function StatWidgetA1() {
  return (
    <>
      <CWidgetStatsA
        className="mb-4"
        color="danger"
        style={{ display: 'flex', margin: '0%', padding: '0%' }}
        value={
          <>
            $9.000{' '}
            <span className="fs-6 fw-normal">
              (40.9% <CIcon icon={cilArrowTop} />)
            </span>
          </>
        }
        title="Widget title"
      />
    </>
  )
}

export default StatWidgetA1
