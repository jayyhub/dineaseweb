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
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import CIcon from '@coreui/icons-react'
function Profile() {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <div className="float-sm-left">
              <h1> My Profile </h1>
            </div>
            <div className="clearfix float-sm-left">
              <CImage align="center" rounded src="./user.jpg" width={300} height={300} />
            </div>
            <br />
            <br />
            <br />
            <div>
              <div>
                <h4 className="parrot"> Name: </h4>
              </div>
              <div>
                <h4 className="teddy"> Muhammad Jawwad </h4>
              </div>
              <br />
              <br />
              <div>
                <h4 className="parrot">Username: </h4>
              </div>
              <div>
                <h4 className="teddy"> mjayy1 </h4>
              </div>
              <br />
              <br />
              <div>
                <h4 className="parrot">CNIC: </h4>
              </div>
              <div>
                <h4 className="teddy"> 42101789456122 </h4>
              </div>
              <br />
              <br />
              <div>
                <h4 className="parrot">Phone No: </h4>
              </div>
              <div>
                <h4 className="teddy"> 03114629584 </h4>
              </div>
              <br />
              <br />
              <div>
                <h4 className="parrot">User Type: </h4>
              </div>
              <div>
                <h4 className="teddy"> Chef </h4>
              </div>
              <br />
              <br />
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Profile
