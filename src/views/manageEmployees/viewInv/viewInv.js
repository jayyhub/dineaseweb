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
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import './viewInv.css'

function ViewInv() {
  const [inventory_id, setinvId] = useState(null)
  const [inventory_name, setiname] = useState('')
  const [cost, setcost] = useState('')
  const [quantity, setquantity] = useState('')
  const [total_cost, settcost] = useState('')
  const [invcategory_nam, setInvCatName] = useState('')
  const [date_of_purchase, setdate] = useState('')

  const [r, setr] = useState([])
  const ip = process.env.REACT_APP_ADDR

  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://' + ip + ':5000/api/inventory').then((result) => {
      result.json().then((resp) => {
        //console.log('Hello')
        setData(resp)
      })
    })
  }, [r])

  const [data1, setCata] = useState([])
  useEffect(() => {
    fetch('http://' + ip + ':5000/api/icategory').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setCata(resp)
      })
    })
  }, [])

  function updateInv() {
    //total_cost = cost * quantity
    let category_id = null

    data1.map((item) => {
      if (item.category_name === invcategory_nam) {
        category_id = item.category_id
      }
    })

    let item = {
      inventory_id,
      inventory_name,
      cost,
      quantity,
      total_cost,
      date_of_purchase,
      category_id,
    }

    console.warn('item', JSON.stringify(item))
    fetch(`http://` + ip + `:5000/api/inventory/${inventory_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((result) => {
      console.log(result)
      if (result.status === 200) {
        setr('')
        alert('Inventory has been Updated.')
      }
    })
  }

  function getUser(id) {
    //console.log('FIRST')
    fetch(`http://` + ip + `:5000/api/inventory/${id}`).then((result) => {
      result.json().then((resp) => {
        setinvId(resp[0].inventory_id)
        setiname(resp[0].inventory_name)
        setcost(resp[0].cost)
        setquantity(resp[0].quantity)
        settcost(resp[0].total_cost)
        setdate(resp[0].date_of_purchase.split('T')[0])
        //setctype(resp[0].category_id)
        data1.map((item) => {
          if (item.category_id === resp[0].category_id) {
            setInvCatName(item.category_name)
          }
        })
      })
    })
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    //console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      //setValidated(x)
      console.log('No Things Okay')
      event.preventDefault()
      //event.stopPropagation()
    } else if (form.checkValidity() === true) {
      //Update Inventory Function call here
      console.log('All Things Okay')
      //LOGIC TO CHECK IF INVENTORY EXIST OR NOT
      updateInv()
      //event.preventDefault()
    } else {
      //else condition here
    }
    //console.log('Hello')
    setValidated(true)
    event.preventDefault()
  }

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer xl>
              <div style={{ overflow: 'scroll', height: '335px' }}>
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
                          <CButton
                            id="edit-inv-button"
                            onClick={() => getUser(items.inventory_id)}
                            color="secondary"
                            style={{ margin: '2%' }}
                          >
                            Edit
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
              <CContainer
                style={{
                  border: '2px solid grey',
                  borderRadius: '12px',
                  marginTop: '2%',
                  marginBottom: '2%',
                  overflow: 'hidden',
                }}
              >
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol md={4}>
                    <CFormLabel htmlFor="InvetoryValidationChange01">Inventory Name</CFormLabel>
                    <CFormInput
                      type="text"
                      aria-describedby="InvetoryValidationChange01Feedback"
                      feedbackInvalid="Inventory Name Should Contain Only Aplhabets"
                      pattern="[A-z a-z]+"
                      id="InvetoryValidationChange01"
                      placeholder="Inventory Name"
                      required
                      value={inventory_name}
                      onChange={(e) => {
                        setiname(e.target.value)
                      }}
                    />
                    <CFormFeedback invalid>Only alphabetic characters allowed</CFormFeedback>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidationChange02">Cost</CFormLabel>
                    <CFormInput
                      type="text"
                      pattern="[0-9]+"
                      placeholder="Cost"
                      feedbackInvalid="Cost Should Contain Only Digits"
                      id="InvetoryValidationChange02"
                      label="Cost"
                      required
                      value={cost}
                      onChange={(e) => {
                        settcost(e.target.value * quantity)
                        setcost(e.target.value)
                      }}
                    />
                    <CFormFeedback invalid>Only digits allowed</CFormFeedback>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidationChange03">Quantity</CFormLabel>
                    <CFormInput
                      type="text"
                      pattern="[0-9]+"
                      placeholder="Quantity"
                      feedbackInvalid="Quantity can only be numberic"
                      id="InvetoryValidationChange03"
                      label="Quantity"
                      required
                      value={quantity}
                      onChange={(e) => {
                        settcost(e.target.value * cost)
                        setquantity(e.target.value)
                      }}
                    />
                    <CFormFeedback invalid>Only digits allowed</CFormFeedback>
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel htmlFor="InventoryValidationChange04">Total Cost</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Total Cost"
                      aria-describedby="inputGroupPrependFeedback"
                      id="InventoryValidationChange04"
                      required
                      disabled
                      value={total_cost}
                      onChange={(e) => {
                        settcost(e.target.value)
                      }}
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="IventoryValidationChange05">Inventory Category</CFormLabel>
                    <CFormSelect
                      //aria-describedby="validationCustom04Feedback"
                      feedbackInvalid="Please select an Inventory Category"
                      id="IventoryValidationChange05"
                      label="Inventory Category"
                      required
                      pattern="/^(?!Inventory Category).*/g"
                      value={invcategory_nam}
                      onChange={(e) => {
                        setInvCatName(e.target.value)
                        // data.map((item) => {
                        //   if (item.category_name === e.target.value) {
                        //     setInvCatName(e.target.value)
                        //   }
                        // })
                      }}
                    >
                      <option selected value="">
                        Inventory Category
                      </option>
                      {data1.map((items, index) => (
                        <option key={index}> {items.category_name} </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Please select an Inventory Category</CFormFeedback>
                  </CCol>
                  <CCol md={4}>
                    <label htmlFor="InventoryValidationChange06" className="form-label">
                      Date of Purchase
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      id="InventoryValidationChange06"
                      value={date_of_purchase}
                      onChange={(e) => {
                        setdate(e.target.value)
                      }}
                    />
                    <CFormFeedback invalid>Please provide a date</CFormFeedback>
                  </CCol>
                  <CCol md={4}>
                    <label htmlFor="InventoryValidationChange06" className="form-label">
                      Date of Purchase
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      id="InventoryValidationChange06"
                      value={date_of_purchase}
                      onChange={(e) => {
                        setdate(e.target.value)
                      }}
                    />
                    <CFormFeedback invalid>Please provide a date</CFormFeedback>
                  </CCol>
                  <CCol xs={4}>
                    <CFormCheck
                      type="checkbox"
                      id="invalidCheck01"
                      label="Confirm Changes"
                      required
                    />
                    <CFormFeedback invalid>
                      You must check the checkbox before submitting.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CButton
                      color="primary"
                      type="submit"
                      style={{
                        marginBottom: '2%',
                        width: '30%',
                      }}
                    >
                      Edit Inventory Item
                    </CButton>
                  </CCol>
                </CForm>
              </CContainer>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default ViewInv
