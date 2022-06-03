import React from 'react'
import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CTableRow,
} from '@coreui/react'

function Table(props) {
  let d = { ...props }
  let centreStyle = {
    //display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  var txt = ''

  return (
    <>
      <CTable striped responsive color="danger">
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Chef Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review</CTableHeaderCell>
            <CTableHeaderCell scope="col">Items</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {d.value.map((items, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{items.users_name}</CTableDataCell>
                <CTableDataCell>{items.review}</CTableDataCell>
                <CTableDataCell>
                  {items.order_items.map((el) => {
                    return el + ' '
                  })}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Table
