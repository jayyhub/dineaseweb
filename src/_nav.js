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
  cilKeyboard,
  cibStatuspage,
  cilFastfood,
  cilFolder,
  cilLockUnlocked,
  cilMenu,
  cilBasket,
  cilOptions,
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
  {
    component: CNavItem,
    name: 'Table Status',
    to: '/manageEmployees/tablestatus',
    icon: <CIcon icon={cilLockUnlocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Order History',
    to: '/manageEmployees/orderHistory',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Profile',
    to: '/manageEmployees/myProfile',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add Menu',
    to: '/manageEmployees/addMenu',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View Menu',
    to: '/manageEmployees/viewMenu',
    icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add Inventory',
    to: '/manageEmployees/addInventory',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'View Inventory',
    to: '/manageEmployees/viewInv',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
]

export default _nav
