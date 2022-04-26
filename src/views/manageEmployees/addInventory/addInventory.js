import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  // CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CHeaderText,
  CImage,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CFormCheck,
  CFormFeedback,
  CFormSelect,
  CFormInput,
  CInputGroupText,
  CInputGroup,
  CFormLabel,
  CForm,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
const ip = process.env.REACT_APP_ADDR

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

function AddInventory() {
  const [inventory_name, setiname] = useState('')
  const [cost1, setcost] = useState('')
  const [quantity1, setquantity] = useState('')
  const [total_cost, settcost] = useState('')
  const [date_of_purchase, setdate] = useState('')
  //const [category_id, setctype] = useState('')
  const [invcategory_nam, setInvCatName] = useState('')

  const [inverr, setinverr] = useState('')
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    //console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      //setValidated(x)
      event.preventDefault()
      //event.stopPropagation()
    } else if (form.checkValidity() === true) {
      //Update Inventory Function call here
      console.log('All Things Okay')
      //LOGIC TO CHECK IF INVENTORY EXIST OR NOT
      AddInventory()
      //event.preventDefault()
    } else {
      //else condition here
    }
    //console.log('Hello')
    setValidated(true)
    event.preventDefault()
  }

  function editproduct(inventory_id) {
    console.log(inventory_id)
  }
  // function loginHandler(e) {
  //   if (/^[a-zA-Z]*$/g.test(fname))
  //     if (/^[a-zA-Z]*$/g.test(lname))
  //       if (/^[1-9]{1}[0-9]{9}$/g.test(phone_no))
  //         if (/^\d{13}$/g.test(NIC))
  //           if (/^[A-Za-z0-9]+$/g.test(username)) saveEmp()
  //           else {
  //             alert(username + ' should be alphabetic or alphabetic with numeric')
  //             return false
  //           }
  //         else {
  //           alert(NIC + ' should be of 13 digits with no -')
  //           return false
  //         }
  //       else {
  //         alert(phone_no + ' should be of 10 digits having no initial 0')
  //         return false
  //       }
  //     else {
  //       alert(lname + ' should be alphabetic')
  //       return false
  //     }
  //   else {
  //     alert(fname + ' should be alphabetic')
  //     return false
  //   }
  //   e.preventDefault()
  // }

  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://' + ip + ':5000/api/icategory').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }, [])

  function AddInventory() {
    const cost = Number(cost1)
    const quantity = Number(quantity1)
    let category_id = null

    data.map((item) => {
      if (item.category_name === invcategory_nam) {
        category_id = item.category_id
      }
    })

    let data_to_send = {
      inventory_name,
      date_of_purchase,
      cost,
      quantity,
      total_cost,
      category_id,
    }
    // console.log('Hello')
    // console.log(data_to_send)
    fetch('http://' + ip + ':5000/api/inventory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_to_send),
    }).then((result) => {
      console.warn('result', result)
      if (result.status === 200) {
        alert('Inventory has been added.')
      }
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
              {/*
              <form className="row g-3" onSubmit={saveEmp}>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Inventory Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[A-Za-z]+"
                    value={inventory_name}
                    onChange={(e) => {
                      setiname(e.target.value)
                    }}
                    id="inputEmail4"
                  ></input>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Cost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit numbers without 0"
                    value={cost1}
                    id="inputZip"
                    onChange={(e) => {
                      settcost(e.target.value * quantity1)
                      setcost(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit numbers without 0"
                    value={quantity1}
                    id="inputZip"
                    onChange={(e) => {
                      settcost(e.target.value * cost1)
                      setquantity(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Total Cost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit numbers without 0"
                    value={total_cost}
                    id="inputZip"
                    onChange={(e) => {
                      settcost(e.target.value)
                    }}
                    disabled
                  ></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    Inventory Category
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    value={category_id}
                    onChange={(e) => {
                      data.map((item) => {
                        if (item.category_name === e.target.value) {
                          console.log('Hello')
                          console.log(item.category_id)
                          setctype(item.category_id)
                        }
                      })
                    }}
                  >
                    <option selected>Choose...</option>
                    {data.map((items, index) => (
                      <option key={index}> {items.category_name} </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Date of Purchase
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    //pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit numbers without 0"
                    value={date_of_purchase}
                    id="inputZip"
                    onChange={(e) => {
                      setdate(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Add Inventory
                  </button>
                </div>
              </form>
                  */}
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={4}>
                  <CFormLabel htmlFor="InvetoryValidation01">Inventory Name</CFormLabel>
                  <CFormInput
                    type="text"
                    aria-describedby="InvetoryValidation01Feedback"
                    feedbackInvalid="Inventory Name Should Contain Only Aplhabets"
                    pattern="[A-z a-z]+"
                    id="InvetoryValidation01"
                    placeholder="Inventory Name"
                    required
                    value={inventory_name}
                    onChange={(e) => {
                      setinverr(false)
                      setiname(e.target.value)
                    }}
                  />
                  <CFormFeedback invalid>Only alphabetic characters allowed</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="ItemValidation02">Cost</CFormLabel>
                  <CFormInput
                    type="text"
                    pattern="[0-9]+"
                    placeholder="Cost"
                    feedbackInvalid="Cost Should Contain Only Digits"
                    id="InvetoryValidation02"
                    label="Cost"
                    required
                    value={cost1}
                    onChange={(e) => {
                      settcost(e.target.value * quantity1)
                      setcost(e.target.value)
                    }}
                  />
                  <CFormFeedback invalid>Only digits allowed</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="ItemValidation03">Quantity</CFormLabel>
                  <CFormInput
                    type="text"
                    pattern="[0-9]+"
                    placeholder="Quantity"
                    feedbackInvalid="Quantity can only be numberic"
                    id="InvetoryValidation03"
                    label="Quantity"
                    required
                    value={quantity1}
                    onChange={(e) => {
                      settcost(e.target.value * cost1)
                      setquantity(e.target.value)
                    }}
                  />
                  <CFormFeedback invalid>Only digits allowed</CFormFeedback>
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="InventoryValidation04">Total Cost</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="Total Cost"
                    aria-describedby="inputGroupPrependFeedback"
                    id="InventoryValidation04"
                    required
                    disabled
                    value={total_cost}
                    onChange={(e) => {
                      settcost(e.target.value)
                    }}
                  />
                  <CFormFeedback invalid>Only digits allowed</CFormFeedback>
                </CCol>
                <CCol md={7}>
                  <CFormLabel htmlFor="IventoryValidation04">Inventory Category</CFormLabel>
                  <CFormSelect
                    //aria-describedby="validationCustom04Feedback"
                    feedbackInvalid="Please select an Inventory Category"
                    id="IventoryValidation04"
                    label="Inventory Category"
                    required
                    pattern="/^(?!Inventory Category).*/g"
                    value={invcategory_nam}
                    onChange={(e) => {
                      setInvCatName(e.target.value)
                    }}
                  >
                    <option selected value="">
                      Inventory Category
                    </option>
                    {data.map((items, index) => (
                      <option key={index}> {items.category_name} </option>
                    ))}
                  </CFormSelect>
                  <CFormFeedback invalid>Please select an Inventory Category</CFormFeedback>
                </CCol>
                <CCol md={5}>
                  <label htmlFor="InventoryValidation05" className="form-label">
                    Date of Purchase
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    id="InventoryValidation05"
                    value={date_of_purchase}
                    onChange={(e) => {
                      setdate(e.target.value)
                    }}
                  />
                  <CFormFeedback invalid>Please select a date</CFormFeedback>
                </CCol>
                <CCol md={10}>
                  <CButton color="primary" type="submit">
                    Submit form
                  </CButton>
                </CCol>
              </CForm>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default AddInventory
