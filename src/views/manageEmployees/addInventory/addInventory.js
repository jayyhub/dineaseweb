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
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'

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
  const [date_of_purchase, setdate] = useState('')
  const [cost1, setcost] = useState('')
  const [quantity1, setquantity] = useState('')
  const [total_cost, settcost] = useState('')
  const [category_id, setctype] = useState('')
  const [userErr, setuserErr] = useState(false)

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
    fetch('http://192.168.43.27:5000/api/icategory').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }, [])

  function saveEmp() {
    //x.json()
    //console.warn(JSON.stringify(x))
    const cost = Number(cost1)
    const quantity = Number(quantity1)
    let data = { inventory_name, date_of_purchase, cost, quantity, total_cost, category_id }
    console.log('Hello')
    console.log(data)
    fetch('http://192.168.43.27:5000/api/inventory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.warn('result', result)
      result.json().then((resp) => {
        console.warn('resp', resp)
      })
    })
    alert('Inventory has been added.')
  }
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
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
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default AddInventory
