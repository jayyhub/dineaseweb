import React from 'react'
import './myProfile.css'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CContainer,
  CImage,
  CRow,
  CCol,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import CIcon from '@coreui/icons-react'
const ip = process.env.REACT_APP_ADDR

function Profile() {
  const username = localStorage.getItem('user-info')
  const id = Number(username[9])
  const [data, setData] = useState('')
  // console.log('x')
  // console.log(id)

  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/user/${id}`).then((result) => {
      result.json().then((resp) => {
        console.warn('result', resp[0])
        setData(resp[0])
      })
    })
  }, [])

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <CContainer className="body flex-grow-1 px-3">
            <CRow>
              <CCol>
                <div className="float-sm-left">
                  <h1> My Profile </h1>
                </div>
                <br />
                <br />
                <br />
                <div>
                  <div>
                    <h4 className="parrot"> Name : </h4>
                  </div>
                  <div>
                    <h4 className="teddy"> {data.users_name} </h4>
                  </div>
                  <br />
                  <br />
                  <div>
                    <h4 className="parrot">Username : </h4>
                  </div>
                  <div>
                    <h4 className="teddy"> {data.username} </h4>
                  </div>
                  <br />
                  <br />
                  <div>
                    <h4 className="parrot">CNIC : </h4>
                  </div>
                  <div>
                    <h4 className="teddy"> {data.NIC} </h4>
                  </div>
                  <br />
                  <br />
                  <div>
                    <h4 className="parrot">Phone No : </h4>
                  </div>
                  <div>
                    <h4 className="teddy"> {data.phone_no} </h4>
                  </div>
                  <br />
                  <br />
                  <div>
                    <h4 className="parrot">User Type : </h4>
                  </div>
                  <div>
                    <h4 className="teddy"> {data.usertype} </h4>
                  </div>
                  <br />
                  <br />
                </div>
              </CCol>
              <CCol>
                <div className="clearfix float-sm-left">
                  <CImage
                    align="center"
                    rounded
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                    width={300}
                    height={300}
                  />
                </div>
              </CCol>
            </CRow>
          </CContainer>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Profile
