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
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
function ViewEmployee() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/users').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }, [])
  console.warn(data)
  //const viewEmployee = () => {
  return (
    <>
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
              <CTableDataCell> {items.phone_no} </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ViewEmployee
