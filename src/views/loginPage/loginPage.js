import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CButton,
  CFormText,
  CImage,
} from '@coreui/react'
import './Login.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Login() {
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [res, setres] = useState('')
  const [status, setstat] = useState(true)
  const [uerr, setuerr] = useState(null)
  const [perr, setperr] = useState(null)
  const history = useHistory()
  const ip = process.env.REACT_APP_ADDR


  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push({
        pathname: '/dashboard',
        state: { user: res },
        //state: { user: res, disp_name: res.users_name },
      })
    }
  })

  function validateForm() {
    if (username.length === 0) setuerr('uprob')
    else if (password.length === 0) {
      setuerr('')
      setperr('pprob')
    } else if (username.length > 0 && password.length > 0) login()
    else alert('Problem In Validation')
  }

  async function login() {
    const usertype = 'admin'
    let item = { username, password, usertype }
    let x = JSON.stringify(item)
    let result = await fetch('http://' + ip + ':5000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(item),
    })
    let stat = await result.status
    if (stat === 200) {
      result = await result.json()
      //console.log('TEST')
      //console.log(result[0].users_name)
      setres(result[0])
      localStorage.setItem('disp_name', result[0].users_name)
      localStorage.setItem('user-info', JSON.stringify(result))
    } else {
      setuerr('')
      setperr('')
      setstat(false)
    }
  }

  return (
    <div className="Login">
      <div className="clearfix">
        {/* <CImage align="center" rounded src="angular.jpg" width={200} height={200} /> */}
      </div>
      <CForm>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleInputEmail1">Username</CFormLabel>
          <CFormInput
            type="text"
            id="exampleInputEmail1"
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          {uerr === 'uprob' ? (
            <div id="uerr">
              <p style={{ color: 'red' }}>Please Enter Username</p>
            </div>
          ) : (
            <div id="uerr"></div>
          )}
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleInputPassword1">User Password</CFormLabel>
          <CFormInput
            type="password"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
          {perr === 'pprob' ? (
            <div id="perr">
              <p style={{ color: 'red' }}>Please Enter Password</p>
            </div>
          ) : (
            <div id="perr"></div>
          )}
        </div>
        {status ? (
          <div id="loginHelp"></div>
        ) : (
          <div id="loginHelp">
            <p style={{ color: 'red' }}>Incorrect Username or Password</p>
          </div>
        )}
        <CButton className="btn" type="submit" onClick={validateForm} color="primary">
          Login
        </CButton>
      </CForm>
    </div>
  )
}
