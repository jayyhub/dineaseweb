import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CContainer,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'

function TableStatus() {
  const [data, setData] = useState([])
  const ip = process.env.REACT_APP_ADDR

  function temp() {
    fetch('http://' + ip + ':5000/api/tables').then((result) => {
      result.json().then((resp) => {
        setData(resp)
      })
    })
  }

  useEffect(() => {
    fetch('http://' + ip + ':5000/api/tables').then((result) => {
      result.json().then((resp) => {
        setData(resp)
      })
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      temp()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Table No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No of Chairs</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((items, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                      <CTableDataCell> {items.No_of_chairs} </CTableDataCell>
                      <CTableDataCell> {items.table_status} </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default TableStatus
