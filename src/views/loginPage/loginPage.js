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
// import {Form} from 'react-bootstrap/Form'
// import {Button} from 'react-bootstrap/Button'
import './Login.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Login() {
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [res, setres] = useState('')
  const history = useHistory()

  function validateForm() {
    return username.length > 0 && password.length > 0
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push({
        pathname: '/dashboard',
        state: { user: res },
      })
    }
  })

  async function login() {
    const usertype = 'admin'
    console.warn(username, password)
    let item = { username, password, usertype }
    let x = JSON.stringify(item)
    //console.log(x)
    let result = await fetch('http://192.168.1.108:5000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(item),
    })
    result = await result.json()
    console.log(result[0])
    setres(result[0])
    localStorage.setItem('user-info', JSON.stringify(result))
    history.push({
      pathname: '/dashboard',
      state: { user: res },
    })
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
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleInputPassword1">User Password</CFormLabel>
          <CFormInput
            type="password"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <CButton className="btn" type="submit" onClick={login} color="primary">
          Login
        </CButton>
      </CForm>
    </div>
  )
}
