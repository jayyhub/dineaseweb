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
        {data.map((items) => (
          <CTableBody key={items}>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell> {items[0].users_name} </CTableDataCell>
              <CTableDataCell> {items[0].usertype} </CTableDataCell>
              <CTableDataCell> {items[0].NIC} </CTableDataCell>
              <CTableDataCell> {items[0].phone_no} </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell> {items[1].users_name} </CTableDataCell>
              <CTableDataCell> {items[1].usertype} </CTableDataCell>
              <CTableDataCell> {items[1].NIC} </CTableDataCell>
              <CTableDataCell> {items[1].phone_no} </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">3</CTableHeaderCell>
              <CTableDataCell> {items[2].users_name} </CTableDataCell>
              <CTableDataCell> {items[2].usertype} </CTableDataCell>
              <CTableDataCell> {items[2].NIC} </CTableDataCell>
              <CTableDataCell> {items[2].phone_no} </CTableDataCell>
            </CTableRow>
          </CTableBody>
        ))}
      </CTable>
    </>
  )
}

export default ViewEmployee
