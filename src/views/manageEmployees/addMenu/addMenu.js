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

function AddMenu() {
  const [item_name, setitemname] = useState('')
  const [item_description, setdesc] = useState('')
  const [menu_status, setstatus] = useState('')
  const [category_id, setcat] = useState('')
  const [icategory_id, setfood] = useState('')
  const [item_price1, setprice] = useState('')
  const [userErr, setuserErr] = useState(false)

  const [data1, setData1] = useState([])
  useEffect(() => {
    fetch('http://192.168.43.27:5000/api/foodcategories').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData1(resp)
      })
    })
  }, [])

  const [data2, setData2] = useState([])
  useEffect(() => {
    fetch('http://192.168.43.27:5000/api/itemcategories').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData2(resp)
      })
    })
  }, [])
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

  function saveEmp() {
    //x.json()
    //console.warn(JSON.stringify(x))
    const item_price = Number(item_price1)
    const image_id = 1
    let data = {
      item_name,
      item_price,
      item_description,
      menu_status,
      image_id,
      category_id,
      icategory_id,
    }
    console.log(data)
    fetch('http://192.168.43.27:5000/api/menu', {
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
    alert('Menu has been added.')
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
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[A-Za-z]+"
                    value={item_name}
                    onChange={(e) => {
                      setitemname(e.target.value)
                    }}
                    id="inputEmail4"
                  ></input>
                </div>
                <div className="col-md-9">
                  <label htmlFor="inputPassword4" className="form-label">
                    Item Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[A-Za-z]+"
                    value={item_description}
                    onChange={(e) => {
                      setdesc(e.target.value)
                    }}
                    id="inputPassword4"
                  ></input>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    Menu Status
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    value={menu_status}
                    onChange={(e) => {
                      setstatus(e.target.value)
                    }}
                  >
                    <option selected>Choose...</option>
                    <option>available</option>
                    <option>not available</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    Item Category
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    value={category_id}
                    onChange={(e) => {
                      data2.map((item) => {
                        if (item.icategory_name === e.target.value) {
                          console.log('Hello')
                          console.log(item.icategory_id)
                          setcat(item.icategory_id)
                        }
                      })
                    }}
                  >
                    <option selected>Choose...</option>
                    {data2.map((items, index) => (
                      <option key={index}> {items.icategory_name} </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    Food Category
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    value={icategory_id}
                    onChange={(e) => {
                      data1.map((item) => {
                        if (item.category_name === e.target.value) {
                          console.log('Hello')
                          console.log(item.category_id)
                          setfood(item.category_id)
                        }
                      })
                    }}
                  >
                    <option selected>Choose...</option>
                    {data1.map((items, index) => (
                      <option key={index}> {items.category_name} </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Item Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit numbers without 0"
                    value={item_price1}
                    id="inputZip"
                    onChange={(e) => {
                      setprice(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Add Menu
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

export default AddMenu
