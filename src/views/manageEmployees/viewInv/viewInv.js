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
function ViewInv() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/inventory').then((result) => {
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
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Inv ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Inv Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date of Purchase</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cost</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Cost</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((items, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                      <CTableDataCell> {items.inventory_name} </CTableDataCell>
                      <CTableDataCell> {items.date_of_purchase} </CTableDataCell>
                      <CTableDataCell> {items.cost} </CTableDataCell>
                      <CTableDataCell> {items.quantity} </CTableDataCell>
                      <CTableDataCell> {items.total_cost} </CTableDataCell>
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

export default ViewInv
