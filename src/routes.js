import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const addEmployee = React.lazy(() => import('./views/manageEmployees/addEmployee/addEmployee'))
const viewEmployee = React.lazy(() => import('./views/manageEmployees/viewEmployee/viewEmployee'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/manageEmployees', name: 'Manage Employees', component: addEmployee, exact: true },
  { path: '/manageEmployees/addEmployee', name: 'Add Employee', component: addEmployee },
  { path: '/manageEmployees/viewEmployee', name: 'View Employee', component: viewEmployee },
]

export default routes
