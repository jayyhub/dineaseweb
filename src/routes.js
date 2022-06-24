import React, { useState } from 'react'
import ModalComponent from './modalComponent'
import orderhistory from './views/manageEmployees/orderHistory/orderHistory'
const viewInv = React.lazy(() => import('./views/manageEmployees/viewInv/viewInv'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const addEmployee = React.lazy(() => import('./views/manageEmployees/addEmployee/addEmployee'))
const viewEmployee = React.lazy(() => import('./views/manageEmployees/viewEmployee/viewEmployee'))
const loginP = React.lazy(() => import('./views/loginPage/loginPage'))
const tablestatus = React.lazy(() => import('./views/manageEmployees/tablestatus/tablestatus'))
const orderHistory = React.lazy(() => import('./views/manageEmployees/orderHistory/orderHistory'))
const myProfile = React.lazy(() => import('./views/manageEmployees/myProfile/myProfile'))
const addMenu = React.lazy(() => import('./views/manageEmployees/addMenu/addMenu'))
const addInventory = React.lazy(() => import('./views/manageEmployees/addInventory/addInventory'))
const viewMenu = React.lazy(() => import('./views/manageEmployees/viewMenu/viewMenu'))

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'LPage', component: loginP, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/manageEmployees', name: 'Manage Employees', component: addEmployee, exact: true },
  { path: '/manageEmployees/addEmployee', name: 'Add Employee', component: addEmployee },
  { path: '/manageEmployees/viewEmployee', name: 'View Employee', component: viewEmployee },
  { path: '/manageEmployees/tablestatus', name: 'Table Status', component: tablestatus },
  { path: '/manageEmployees/orderHistory', name: 'Order History', component: orderHistory },
  { path: '/manageEmployees/myProfile', name: 'My Profile', component: myProfile },
  { path: '/manageEmployees/addMenu', name: 'Add Menu', component: addMenu },
  { path: '/manageEmployees/addInventory', name: 'Add Inventory', component: addInventory },
  { path: '/manageEmployees/viewMenu', name: 'View Menu', component: viewMenu },
  { path: '/manageEmployees/viewInv', name: 'View Inventory', component: viewInv },
]

// const RenderModal = (o_id, t_id, amnt) => {
//   const [visible, setVisible] = useState(true)
//   return (
//     <>
//       <CModal visible={visible} onClose={() => setVisible(false)}>
//         <CModalHeader>
//           <CModalTitle>Modal title</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           I will not close if you click outside me. Donot even try to press escape key.
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setVisible(false)}>
//             Close
//           </CButton>
//           <CButton color="primary">Save changes</CButton>
//         </CModalFooter>
//       </CModal>
//     </>
//   )
// }

export { routes }
