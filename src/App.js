import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import AddEmployee from './views/manageEmployees/addEmployee/addEmployee'
import ViewEmployee from './views/manageEmployees/viewEmployee/viewEmployee'
import Login from './views/loginPage/loginPage'
import TableStatus from './views/manageEmployees/tablestatus/tablestatus'
import Orderhistory from './views/manageEmployees/orderHistory/orderHistory'
import Profile from './views/manageEmployees/myProfile/myProfile'
import AddMenu from './views/manageEmployees/addMenu/addMenu'
import AddInventory from './views/manageEmployees/addInventory/addInventory'
import ViewInv from './views/manageEmployees/viewInv/viewInv'
import ViewMenu from './views/manageEmployees/viewMenu/viewMenu'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} /> */}
            {/* <Route
              exact
              path="/register"
              name="Register Page" */}
            {/* // render={(props) => <Register {...props} />} */}
            {/* /> */}
            {/* <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} /> */}
            {/* <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} /> */}
            {/* <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */}
            <Route exact path="/" name="LPage" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/dashboard"
              name="Dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/addEmployee"
              name="addEmployee"
              render={(props) => <AddEmployee {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/viewEmployee"
              name="viewEmployee"
              render={(props) => <ViewEmployee {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/tablestatus"
              name="tablestatus"
              render={(props) => <TableStatus {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/orderHistory"
              name="orderhistory"
              render={(props) => <Orderhistory {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/myProfile"
              name="Profile"
              render={(props) => <Profile {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/addMenu"
              name="addMenu"
              render={(props) => <AddMenu {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/viewMenu"
              name="viewMenu"
              render={(props) => <ViewMenu {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/addInventory"
              name="addInventory"
              render={(props) => <AddInventory {...props} />}
            />
            <Route
              exact
              path="/manageEmployees/viewInv"
              name="viewInv"
              render={(props) => <ViewInv {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
