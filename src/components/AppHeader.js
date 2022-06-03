import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
  CNavbarText,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './styles.css'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { useHistory } from 'react-router-dom'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const history = useHistory()
  const dispname = localStorage.getItem('disp_name')
  function logOut() {
    localStorage.clear()
    history.push('/')
  }
  return (
    <CHeader position="sticky" className="mb-1">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active" className="hh">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <div className="avatartext">
              <CNavbarText> {dispname} </CNavbarText>
            </div>
          </CNavItem>
          <CNavItem>
            <CAvatar color="secondary" size="lg">
              {dispname[0]}
            </CAvatar>
          </CNavItem>
          <CNavItem>
            <div className="btnava">
              <CButton color="dark" shape="rounded-pill" onClick={logOut}>
                LogOut
              </CButton>
            </div>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
