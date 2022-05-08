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
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
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
                    <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Review</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Table no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chef</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <select
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
                      </select>
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
