import PropTypes, { func } from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
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

function AddMenu() {
  const [item_name, setitemname] = useState('')
  const [item_description, setdesc] = useState('')
  const [menu_status, setstatus] = useState('')
  const [icategory_id, setcat] = useState('')
  const [cat_name, setCatName] = useState('')
  const [category_id, setfood] = useState('')
  const [icat_name, setiCatName] = useState('')
  const [item_price1, setprice] = useState('')
  const [inameerr, setierr] = useState(false)

  const [data1, setData1] = useState([])
  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/foodcategories`).then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData1(resp)
      })
    })
  }, [])

  // const [data2, setData2] = useState([])
  // useEffect(() => {
  //   fetch(`http://` + ip + `:5000/api/itemcategories`).then((result) => {
  //     result.json().then((resp) => {
  //       setData2(resp)
  //     })
  //   })
  // }, [])

  async function fetchicat(cat_id) {
    // let result = await fetch(
    //   `http://` + ip + `:5000/api/itemcategories/${encodeURIComponent(cat_id)}`,
    // )
    let result = await fetch(`http://` + ip + `:5000/api/itemcategories/${cat_id}`)
    let resp = await result.json()
    setData2(resp)
  }

  const [data2, setData2] = useState([])

  function saveEmp() {
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
    //console.log('NEWLY CREATED CHECK POINT')
    //console.log(data)
    fetch(`http://` + ip + `:5000/api/menu`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => {
      //console.warn('result', result)
      result.json().then((resp) => {
        //console.warn('resp', resp)
      })
    })
    alert('Menu has been added.')
  }

  async function CheckItemName() {
    let result = await fetch(
      `http://` + ip + `:5000/api/verifyitemname?i_name=${encodeURIComponent(item_name)}`,
    )
    let resp = await result.json()
    if (resp === false) {
      //if item name does not exist
      setierr(false)
      saveEmp()
    } else setierr(true)
  }

  function MenuAddHandler(e) {
    if (/^[a-zA-Z ]*$/g.test(item_name))
      if (/^[a-zA-Z ,]*$/g.test(item_description))
        if (/^[0-9]+$/g.test(item_price1))
          //if All Regular expressions gets satified
          CheckItemName()
        else {
          alert(item_price1 + ' should contain digits only')
          return false
        }
      else {
        alert(item_description + ' should contain alphabets only')
        return false
      }
    else {
      alert(item_name + ' should contain alphabets only')
      return false
    }
    e.preventDefault()
  }

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3 m-4">
            <CContainer lg>
              <h3>
                <u>Add a new Menu Item</u>
              </h3>
              {/* <form className="row g-3" onSubmit={saveEmp}> */}
              <form className="row g-3" onSubmit={MenuAddHandler}>
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
                  {inameerr ? <div style={{ color: 'red' }}>Item Name Already Exist</div> : <></>}
                </div>
                <div className="col-md-6">
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
                    <option>unavailable</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Item Description
                  </label>
                  {/* <input
                    type="text"
                    className="form-control"
                    required
                    //pattern="[A-Za-z]+"
                    value={item_description}
                    style={{
                      height: '100px',
                    }}
                    onChange={(e) => {
                      setdesc(e.target.value)
                    }}
                    id="inputPassword4"
                  ></input> */}
                  <textarea
                    type="text"
                    cols="40"
                    rows="4"
                    className="form-control"
                    required
                    //pattern="[A-Za-z]+"
                    value={item_description}
                    onChange={(e) => {
                      setdesc(e.target.value)
                    }}
                    id="inputPassword4"
                  ></textarea>
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    Food Category
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    //value={icategory_id}
                    value={cat_name}
                    onChange={(e) => {
                      data1.map((item) => {
                        if (item.category_name === e.target.value) {
                          //console.log('Hello')
                          //console.log(item.category_id)
                          setCatName(e.target.value)
                          setfood(item.category_id)
                          fetchicat(item.category_id)
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
                <div className="col-md-3">
                  <label htmlFor="inputState" className="form-label">
                    Item Category
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    //value={category_id}
                    value={icat_name}
                    onChange={(e) => {
                      data2.map((item) => {
                        if (item.icategory_name === e.target.value) {
                          //console.log('Hello')
                          //console.log(item.icategory_id)
                          setiCatName(e.target.value)
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
                <div
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '200px',
                    }}
                  >
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
