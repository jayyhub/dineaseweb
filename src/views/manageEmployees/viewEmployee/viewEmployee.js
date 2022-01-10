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
    fetch('https://jsonplaceholder.typicode.com/todos/1').then((result) => {
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
          {/* {data.map((items) => ( */}
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell> {data.title} </CTableDataCell>
            <CTableDataCell> {data.userId} </CTableDataCell>
            <CTableDataCell> {data.completed} </CTableDataCell>
            <CTableDataCell> {data.title} </CTableDataCell>
          </CTableRow>
          {/* ))} */}
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
            <CTableDataCell>1234</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>Larry the Bird</CTableDataCell>
            <CTableDataCell>Chef</CTableDataCell>
            <CTableDataCell>@twitter</CTableDataCell>
            <CTableDataCell>1234</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ViewEmployee
