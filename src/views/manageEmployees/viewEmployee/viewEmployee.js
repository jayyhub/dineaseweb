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

function ViewEmployee(props) {
  const [data, setData] = useState([])
  const ip = process.env.REACT_APP_ADDR

  useEffect(() => {
    fetch('http://' + ip + ':5000/api/users').then((result) => {
      result.json().then((resp) => {
        setData(resp)
      })
    })
  }, [])

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg style={{ height: '600px', overflow: 'scroll' }}>
              <h3>View Employees</h3>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">EmpID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Type</CTableHeaderCell>
                    <CTableHeaderCell scope="col">CNIC</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone No</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((items, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                      <CTableDataCell> {items.users_name} </CTableDataCell>
                      <CTableDataCell> {items.usertype} </CTableDataCell>
                      <CTableDataCell> {items.NIC} </CTableDataCell>
                      <CTableDataCell> 0{items.phone_no} </CTableDataCell>
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

export default ViewEmployee
