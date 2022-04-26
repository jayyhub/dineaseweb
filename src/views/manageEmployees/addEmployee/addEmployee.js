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

function AddEmployee() {
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [phone_no, setphone_no] = useState('')
  const [usertype, setusertype] = useState('')
  const [NIC, setNIC] = useState('')
  const [password, setpassword] = useState('')
  const [username, setuid] = useState('')
  const [unerr, setunerr] = useState('')
  const [pherr, setpherr] = useState('')
  const [nicerr, setnicerr] = useState('')
  const ip = process.env.REACT_APP_ADDR

  async function checkEmp() {
    let result = await fetch(
      `http://` + ip + `:5000/api/verifyuname?uname=${encodeURIComponent(username)}`,
    )
    let resp = await result.json()
    if (resp === false) {
      result = await fetch(
        `http://` + ip + `:5000/api/verifynumber?number=${encodeURIComponent(phone_no)}`,
      )
      resp = await result.json()
      if (resp === false) {
        result = await fetch(`http://` + ip + `:5000/api/verifynic?nic=${encodeURIComponent(NIC)}`)
        resp = await result.json()
        if (resp === false) saveEmp()
        else {
          setunerr('')
          setpherr('')
          setnicerr('NIC number Already Exist')
        }
      } else {
        setunerr('')
        setpherr('Phone Number Already Exist')
      }
    } else setunerr('Username Already Exists')
    //console.log(stat)
  }

  function loginHandler(e) {
    if (/^[a-zA-Z]*$/g.test(fname))
      if (/^[a-zA-Z]*$/g.test(lname))
        if (/^[1-9]{1}[0-9]{9}$/g.test(phone_no))
          if (/^\d{13}$/g.test(NIC))
            if (/^[A-Za-z0-9]+$/g.test(username))
              //saveEmp()
              checkEmp()
            else {
              alert(username + ' should be alphabetic or alphabetic with numeric')
              return false
            }
          else {
            alert(NIC + ' should be of 13 digits with no -')
            return false
          }
        else {
          alert(phone_no + ' should be of 10 digits having no initial 0')
          return false
        }
      else {
        alert(lname + ' should be alphabetic')
        return false
      }
    else {
      alert(fname + ' should be alphabetic')
      return false
    }
    e.preventDefault()
  }

  function saveEmp() {
    const users_name = fname + ' ' + lname
    let x = { phone_no, password, usertype, NIC, username, users_name }
    //x.json()
    //console.warn(JSON.stringify(x))
    let data = { phone_no, password, usertype, NIC, username, users_name }
    fetch('http://' + ip + ':5000/api/users', {
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
    alert('Employee has been added.')
  }
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <form className="row g-3" onSubmit={loginHandler}>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    pattern="[A-Za-z]+"
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
                    required
                    pattern="[A-Za-z]+"
                    value={lname}
                    onChange={(e) => {
                      setlname(e.target.value)
                    }}
                    id="inputPassword4"
                  ></input>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    pattern="[A-Za-z0-9]+"
                    value={username}
                    onChange={(e) => {
                      setuid(e.target.value)
                    }}
                    id="inputCity"
                  ></input>
                  <p style={{ color: 'red' }}>{unerr}</p>
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
                    required
                    pattern="[1-9]{1}[0-9]{9}"
                    title="Enter 10 digit numbers without 0"
                    value={phone_no}
                    id="inputZip"
                    onChange={(e) => {
                      setphone_no(e.target.value)
                    }}
                  ></input>
                  <p style={{ color: 'red' }}>{pherr}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    CNIC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    pattern="\d{13}"
                    title="Enter 13 Digits without -"
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
                  <p style={{ color: 'red' }}>{nicerr}</p>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Add Employee
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

export default AddEmployee
