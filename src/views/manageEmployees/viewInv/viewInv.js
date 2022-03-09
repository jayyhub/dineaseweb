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
  CButton,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import './viewInv.css'

function ViewInv() {
  const [inventory_name, setiname] = useState('')
  const [cost, setcost] = useState('')
  const [quantity, setquantity] = useState('')
  const [inventory_id, setinvId] = useState(null)
  const [total_cost, settcost] = useState('')
  const [category_id, setctype] = useState('')
  const [date_of_purchase, setdate] = useState('')
  const [data, setData] = useState([])
  const [r, setr] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/inventory').then((result) => {
      result.json().then((resp) => {
        console.log('Hello')
        setData(resp)
      })
    })
  }, [r])

  const [data1, setCata] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/icategory').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setCata(resp)
      })
    })
  }, [])

  function updateInv(
    inventory_name,
    cost,
    quantity,
    inventory_id,
    total_cost,
    category_id,
    date_of_purchase,
  ) {
    total_cost = cost * quantity
    let item = {
      inventory_id,
      inventory_name,
      cost,
      quantity,
      date_of_purchase,
      total_cost,
      category_id,
    }

    console.warn('item', JSON.stringify(item))
    fetch(`http://192.168.1.108:5000/api/inventory/${inventory_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        setr(resp)
      })
    })
  }

  function getUser(id) {
    fetch(`http://192.168.1.108:5000/api/inventory/${id}`).then((result) => {
      result.json().then((resp) => {
        console.warn('hey')
        setiname(resp[0].inventory_name)
        setcost(resp[0].cost)
        setquantity(resp[0].quantity)
        setinvId(resp[0].inventory_id)
        settcost(resp[0].total_cost)
        setdate(resp[0].date_of_purchase.split('T')[0])
        setctype(resp[0].category_id)
      })
    })
  }
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <div className="half">
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Inv ID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Inv Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Date of Purchase</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Cost</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Total Cost</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((items, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                        <CTableDataCell> {items.inventory_name} </CTableDataCell>
                        <CTableDataCell> {items.category_name} </CTableDataCell>
                        <CTableDataCell> {items.date_of_purchase} </CTableDataCell>
                        <CTableDataCell> {items.cost} </CTableDataCell>
                        <CTableDataCell> {items.quantity} </CTableDataCell>
                        <CTableDataCell> {items.total_cost} </CTableDataCell>
                        <CTableDataCell>
                          {/* <button onClick={() => selectUser(items.inventory_id)}>Edit</button> */}
                          <button onClick={() => getUser(items.inventory_id)}>Edit</button>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
              <div>
                <input
                  type="text"
                  className="space sp"
                  placeholder="Inventory Name"
                  value={inventory_name}
                  onChange={(e) => {
                    setiname(e.target.value)
                  }}
                />
                <input
                  type="text"
                  className="space sp"
                  placeholder="Cost"
                  value={cost}
                  onChange={(e) => {
                    setcost(e.target.value)
                  }}
                />
                <input
                  type="text"
                  className="space sp"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => {
                    setquantity(e.target.value)
                  }}
                />
                <input
                  type="date"
                  className="space sp"
                  placeholder="Date of Purchase"
                  value={date_of_purchase}
                  onChange={(e) => {
                    setquantity(e.target.value)
                  }}
                />
                <select
                  id="inputState"
                  className="form-select space sp"
                  value={category_id}
                  onChange={(e) => {
                    data1.map((item) => {
                      if (item.category_name === e.target.value) {
                        console.log('Hello')
                        console.log(item.category_id)
                        setctype(item.category_id)
                      }
                    })
                  }}
                >
                  <option selected>Choose...</option>
                  {data1.map((items, index) => (
                    <option key={index}> {items.category_name} </option>
                  ))}
                </select>
                <button
                  className="butn"
                  onClick={() =>
                    updateInv(
                      inventory_name,
                      cost,
                      quantity,
                      inventory_id,
                      total_cost,
                      category_id,
                      date_of_purchase,
                    )
                  }
                >
                  Update Inventory
                </button>
              </div>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default ViewInv
