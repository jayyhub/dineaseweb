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
import LoginPhoto from '../../assets/images/login_photo.jpg'
import CIcon from '@coreui/icons-react'
import { cilBriefcase, cilRestaurant, cilPeople } from '@coreui/icons'

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
  }, [])

  function validateForm(e) {
    e.preventDefault()
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
    // let x = JSON.stringify(item)
    // console.log(x, item)
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
      console.log('TEST')
      console.log(result[0].users_name)
      setres(result[0])
      localStorage.setItem('disp_name', result[0].users_name)
      localStorage.setItem('user-info', JSON.stringify(result))
      history.push({
        pathname: '/dashboard',
        state: { user: result[0] },
        //state: { user: res, disp_name: res.users_name },
      })
    } else {
      setuerr('')
      setperr('')
      setstat(false)
    }
  }

  const imageStyle = {
    position: 'relative',
    objectFit: 'cover',
    width: '100vw',
    height: '100vh',
  }

  const loginContainer = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '20000',
  }

  const container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }

  const loginStyle = {
    backgroundColor: 'rgba(115, 119, 123, 0.5)',
    borderRadius: '15px',
    width: '520px',
    padding: '0px 10px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
  }

  const wrapper = {
    padding: '20px',
  }

  const headingStyle = {
    textAlign: 'center',
    color: 'black',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 8px',
    fontSize: '20px',
    borderRadius: '10px',
    backgroundColor: '#FFF8F3',
    color: 'black',
    border: 'none',
    margin: '8px 0px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  }

  const buttonStyle = {
    padding: '2px 15px',
    marginTop: '30px',
    fontSize: '25px',
    backgroundColor: '#EFEFEF',
    color: 'black',
    borderRadius: '5px',
    border: 'none',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  }

  const iconContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
  }

  return (
    <div>
      <img style={imageStyle} src={LoginPhoto} alt="login page" />
      <div style={loginContainer}>
        <div style={container}>
          <div style={loginStyle}>
            <div style={wrapper}>
              <div style={iconContainer}>
                <div>
                  <CIcon icon={cilRestaurant} size="3xl" />
                </div>
                <div>
                  <CIcon icon={cilBriefcase} size="3xl" />
                </div>
                <div>
                  <CIcon icon={cilPeople} size="3xl" />
                </div>
              </div>
              <h3 style={{ textAlign: 'center' }}>DineEase Admin Panel</h3>
              <p style={{ textAlign: 'center' }}>
                All your Dine In, Employee, Inventory management at a single place
              </p>
              <h1 style={headingStyle}>Sign In</h1>
              <hr />
              <form onSubmit={validateForm}>
                <input
                  type="text"
                  id="loginusername"
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  name="username"
                  value={username}
                  placeholder="Username"
                />
                {uerr === 'uprob' ? (
                  <div id="uerr">
                    <p style={{ color: 'red' }}>Please Enter Username</p>
                  </div>
                ) : (
                  <div id="uerr"></div>
                )}
                <input
                  type="password"
                  id="loginpassword"
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  name="password"
                  value={password}
                  placeholder="Password"
                />
                {perr === 'pprob' ? (
                  <div id="perr">
                    <p style={{ color: 'red' }}>Please Enter Password</p>
                  </div>
                ) : (
                  <div id="perr"></div>
                )}
                {status ? (
                  <div id="loginHelp"></div>
                ) : (
                  <div id="loginHelp">
                    <p style={{ color: 'red' }}>Incorrect Username or Password</p>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button type="submit" style={buttonStyle}>
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="Login">
    //   <div className="clearfix">
    //     {/* <CImage align="center" rounded src="angular.jpg" width={200} height={200} /> */}
    //   </div>
    //   <CForm>
    //     <div className="mb-3">
    //       <CFormLabel htmlFor="exampleInputEmail1">Username</CFormLabel>
    //       <CFormInput
    //         type="text"
    //         id="exampleInputEmail1"
    //         onChange={(e) => setEmail(e.target.value)}
    //         aria-describedby="emailHelp"
    //       />
    //       {uerr === 'uprob' ? (
    //         <div id="uerr">
    //           <p style={{ color: 'red' }}>Please Enter Username</p>
    //         </div>
    //       ) : (
    //         <div id="uerr"></div>
    //       )}
    //     </div>
    //     <div className="mb-3">
    //       <CFormLabel htmlFor="exampleInputPassword1">User Password</CFormLabel>
    //       <CFormInput
    //         type="password"
    //         id="exampleInputPassword1"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       {perr === 'pprob' ? (
    //         <div id="perr">
    //           <p style={{ color: 'red' }}>Please Enter Password</p>
    //         </div>
    //       ) : (
    //         <div id="perr"></div>
    //       )}
    //     </div>
    //     {status ? (
    //       <div id="loginHelp"></div>
    //     ) : (
    //       <div id="loginHelp">
    //         <p style={{ color: 'red' }}>Incorrect Username or Password</p>
    //       </div>
    //     )}
    //     <CButton className="btn" type="submit" onClick={validateForm} color="primary">
    //       Login
    //     </CButton>
    //   </CForm>
    // </div>
  )
}
