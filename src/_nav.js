import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilHome,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilPlus,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Add Employee',
    to: '/manageEmployees/addEmployee',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View Employee',
    to: '/manageEmployees/viewEmployee',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
