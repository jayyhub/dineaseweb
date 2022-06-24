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
import './tablestatus.css'

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
            <div
              style={{
                //backgroundColor: 'red',
                padding: '0px',
                margin: '10px',
                //display: 'flex',
              }}
            >
              <h1>
                <u>Table Status</u>
              </h1>
              <div className="wrapper">
                {data.map((items, index) =>
                  items.table_status === 'free' ? (
                    <>
                      <div
                        key={index}
                        style={{
                          border: '2px solid grey',
                          borderRadius: '10px',
                          height: '160px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            border: '2px solid grey',
                            borderRadius: '20px',
                            height: '120px',
                            width: '300px',
                            backgroundColor: '#8BDB81',
                            //backgroundColor: '#E05D5D',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <p>
                            Table No: {index + 1} <br /> Number Of Seats: {items.No_of_chairs}
                            <br />
                            Table Status: {items.table_status}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        key={index}
                        style={{
                          border: '2px solid grey',
                          borderRadius: '10px',
                          height: '160px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            border: '2px solid grey',
                            borderRadius: '20px',
                            height: '120px',
                            width: '300px',
                            //backgroundColor: '#8BDB81',
                            backgroundColor: '#E05D5D',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <p>
                            Table No: {index + 1} <br /> Number Of Seats: {items.No_of_chairs}
                            <br />
                            Table Status: {items.table_status}
                          </p>
                        </div>
                      </div>
                    </>
                  ),
                )}
              </div>
              {/* <CTable striped>
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
              </CTable> */}
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default TableStatus
