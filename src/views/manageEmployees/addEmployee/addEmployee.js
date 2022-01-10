import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CForm, CFormLabel, CFormInput, CFormCheck, CButton } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'

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

function AddEmployee() {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [phone_no, setphone_no] = useState('')
  const [usertype, setusertype] = useState('')
  const [NIC, setNIC] = useState('')
  const [password, setpassword] = useState('')
  const [username, setuid] = useState('')
  function saveEmp() {
    const users_name = fname + ' ' + lname
    let x = { phone_no, password, usertype, NIC, username, users_name }
    //x.json()
    //console.warn(JSON.stringify(x))
    let data = { phone_no, password, usertype, NIC, username, users_name }
    fetch('http://192.168.1.108:5000/api/users', {
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
  }
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            value={fname}
            onChange={(e) => {
              setfname(e.target.value)
            }}
            id="inputEmail4"
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            value={lname}
            onChange={(e) => {
              setlname(e.target.value)
            }}
            id="inputPassword4"
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              setuid(e.target.value)
            }}
            id="inputCity"
          ></input>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            User Type
          </label>
          <select
            id="inputState"
            className="form-select"
            value={usertype}
            onChange={(e) => {
              setusertype(e.target.value)
            }}
          >
            <option selected>Choose...</option>
            <option>admin</option>
            <option>chef</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            value={phone_no}
            id="inputZip"
            onChange={(e) => {
              setphone_no(e.target.value)
            }}
          ></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            CNIC
          </label>
          <input
            type="text"
            className="form-control"
            value={NIC}
            onChange={(e) => {
              setNIC(e.target.value)
            }}
            id="inputCity"
          ></input>
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value)
            }}
            id="inputPassword4"
          ></input>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={saveEmp}>
            Add Employee
          </button>
        </div>
      </form>
    </>
  )
}

export default AddEmployee
