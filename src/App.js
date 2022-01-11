import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import AddEmployee from './views/manageEmployees/addEmployee/addEmployee'
import ViewEmployee from './views/manageEmployees/viewEmployee/viewEmployee'
import Login from './views/loginPage/loginPage'
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
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
