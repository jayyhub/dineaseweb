import React from 'react'
import './orderHistory.css'
import ReactDOM from 'react-dom'
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
  CFormSelect,
  CCol,
  CRow,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/react'
import { cilChevronTop, cilChevronBottom } from '@coreui/icons'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import CIcon from '@coreui/icons-react'
const ip = process.env.REACT_APP_ADDR

function Orderhistory() {
  const [data, setData] = useState([])
  const [stat, setStat] = useState('all')
  let ctabbod

  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/orders`).then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }, [])
  console.warn(data)

  function temp() {
    fetch(`http://` + ip + `:5000/api/orders`).then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      temp()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  ctabbod = data.map((items, index) => {
    if (stat === 'all') {
      return (
        <CTableRow key={index}>
          <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
          <CTableDataCell> {items.order_time} </CTableDataCell>
          <CTableDataCell> {items.total_price} </CTableDataCell>
          <CTableDataCell> {items.payment_mode} </CTableDataCell>
          <CTableDataCell> {items.rating} </CTableDataCell>
          <CTableDataCell> {items.review} </CTableDataCell>
          <CTableDataCell> {items.table_id} </CTableDataCell>
          <CTableDataCell> {items.users_name} </CTableDataCell>
          <CTableDataCell> {items.order_status} </CTableDataCell>
        </CTableRow>
      )
    } else {
      if (items.order_status === stat) {
        return (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
            <CTableDataCell> {items.order_time} </CTableDataCell>
            <CTableDataCell> {items.total_price} </CTableDataCell>
            <CTableDataCell> {items.payment_mode} </CTableDataCell>
            <CTableDataCell> {items.rating} </CTableDataCell>
            <CTableDataCell> {items.review} </CTableDataCell>
            <CTableDataCell> {items.table_id} </CTableDataCell>
            <CTableDataCell> {items.users_name} </CTableDataCell>
            <CTableDataCell> {items.order_status} </CTableDataCell>
          </CTableRow>
        )
      }
    }
  })

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
                    <CTableHeaderCell scope="col">Sno</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Order Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      style={{
                        backgroundColor: 'red',
                        // height: '150px',
                        // width: '150px',
                      }}
                    >
                      <span>Payment Method</span>
                      <CContainer>
                        <CRow>
                          <button>Hello</button>
                        </CRow>
                        <CRow>
                          <button>Hello</button>
                        </CRow>
                      </CContainer>
                      {/* <CRow>
                        <CIcon
                          icon={cilChevronTop}
                          customClassName="cil-chevron-top-alt"
                          style={{
                            height: '15px',
                            width: '20px',
                            backgroundColor: 'red',
                            margin: '0px',
                            padding: '0px',
                          }}
                        />
                      </CRow>
                      <CRow>
                        <CIcon
                          icon={cilChevronBottom}
                          customClassName="cil-chevron-bottom-alt"
                          style={{
                            height: '15px',
                            width: '20px',
                            backgroundColor: 'red',
                            margin: '0px',
                            padding: '0px',
                          }}
                        />
                      </CRow> */}
                    </CTableHeaderCell>
                    {/* <CContainer
                      style={{
                        backgroundColor: 'yellow',
                        // height: '40px',
                        // width: '200px',
                      }}
                    >
                      <CCol>
                        <CTableHeaderCell
                          scope="col"
                          style={{
                            backgroundColor: 'red',
                            // height: '150px',
                            // width: '150px',
                          }}
                        >
                          Payment Method
                        </CTableHeaderCell>
                      </CCol>
                      <CCol>
                        <CRow>
                          <CIcon
                            icon={cilChevronTop}
                            customClassName="cil-chevron-top-alt"
                            style={{
                              height: '15px',
                              width: '20px',
                              backgroundColor: 'red',
                              margin: '0px',
                              padding: '0px',
                            }}
                          />
                        </CRow>
                        <CRow>
                          <CIcon
                            icon={cilChevronBottom}
                            customClassName="cil-chevron-bottom-alt"
                            style={{
                              height: '15px',
                              width: '20px',
                              backgroundColor: 'red',
                              margin: '0px',
                              padding: '0px',
                            }}
                          />
                        </CRow>
                      </CCol>
                    </CContainer> */}
                    <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Review</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Table no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chef</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CCol>
                        {/* <CRow>
                          <CIcon icon={cilFilter} customClassName="cis-filter" />
                        </CRow> */}
                        <CRow>
                          <CFormSelect
                            size="sm"
                            onChange={(e) => {
                              setStat(e.target.value)
                            }}
                          >
                            <option selected value="all">
                              All
                            </option>
                            <option value="n assg">Not Assigned</option>
                            <option value="assigned">Assigned</option>
                            <option value="ready">Ready</option>
                            <option value="serving">Serving</option>
                            <option value="served">Served</option>
                          </CFormSelect>
                        </CRow>
                        <CRow> Order Status </CRow>
                      </CCol>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* {data.map((items, index) => {
                    if (stat === 'all') {
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                        <CTableDataCell> {items.order_time} </CTableDataCell>
                        <CTableDataCell> {items.total_price} </CTableDataCell>
                        <CTableDataCell> {items.payment_mode} </CTableDataCell>
                        <CTableDataCell> {items.rating} </CTableDataCell>
                        <CTableDataCell> {items.review} </CTableDataCell>
                        <CTableDataCell> {items.table_id} </CTableDataCell>
                        <CTableDataCell> {items.users_name} </CTableDataCell>
                        <CTableDataCell> {items.order_status} </CTableDataCell>
                      </CTableRow>
                    } else {
                      if (items.order_status === stat) {
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                          <CTableDataCell> {items.order_time} </CTableDataCell>
                          <CTableDataCell> {items.total_price} </CTableDataCell>
                          <CTableDataCell> {items.payment_mode} </CTableDataCell>
                          <CTableDataCell> {items.rating} </CTableDataCell>
                          <CTableDataCell> {items.review} </CTableDataCell>
                          <CTableDataCell> {items.table_id} </CTableDataCell>
                          <CTableDataCell> {items.users_name} </CTableDataCell>
                          <CTableDataCell> {items.order_status} </CTableDataCell>
                        </CTableRow>
                      }
                    }
                  })} */}
                  {ctabbod}
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
