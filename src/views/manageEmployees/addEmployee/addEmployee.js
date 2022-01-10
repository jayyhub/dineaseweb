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

const addEmployee = () => {
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            First Name
          </label>
          <input type="email" className="form-control" id="inputEmail4"></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-control" id="inputPassword4"></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            ID
          </label>
          <input type="text" className="form-control" id="inputCity"></input>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            User Type
          </label>
          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
            <option>Admin</option>
            <option>Chef</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Phone
          </label>
          <input type="text" className="form-control" id="inputZip"></input>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            NIC
          </label>
          <input type="text" className="form-control" id="inputCity"></input>
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="inputPassword4"></input>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </div>
      </form>
    </>
  )
}

export default addEmployee
