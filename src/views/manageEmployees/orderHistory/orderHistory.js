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
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
function Orderhistory() {
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
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">OrderID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Review</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Table no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chef</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CDropdown className="mt-2">
                        <CDropdownToggle color="secondary" size="sm">
                          Order Status
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>All</CDropdownItem>
                          <CDropdownItem>Ready</CDropdownItem>
                          <CDropdownItem>Assigned</CDropdownItem>
                          <CDropdownItem>Served</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell>
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
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Orderhistory
