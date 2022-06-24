import React, { Component, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CCol,
} from '@coreui/react'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const ip = process.env.REACT_APP_ADDR

let socket = new WebSocket('ws://' + ip + ':3000')
console.log('Initializing Web Socket')
console.log(socket)

function connectUser(role, u_id) {
  console.log('I am here 1')
  socket.send(
    JSON.stringify({
      type: 'connection buildup',
      content: [role, u_id],
    }),
  )
  //socket.close()
}

// class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <React.Suspense fallback={loading}>
//           <Switch>
//             {/* <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} /> */}
//             {/* <Route
//               exact
//               path="/register"
//               name="Register Page" */}
//             {/* // render={(props) => <Register {...props} />} */}
//             {/* /> */}
//             {/* <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} /> */}
//             {/* <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} /> */}
//             {/* <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} /> */}
//             <Route exact path="/" name="LPage" render={(props) => <Login {...props} />} />
//             <Route
//               exact
//               path="/dashboard"
//               name="Dashboard"
//               render={(props) => <Dashboard {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/addEmployee"
//               name="addEmployee"
//               render={(props) => <AddEmployee {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/viewEmployee"
//               name="viewEmployee"
//               render={(props) => <ViewEmployee {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/tablestatus"
//               name="tablestatus"
//               render={(props) => <TableStatus {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/orderHistory"
//               name="orderhistory"
//               render={(props) => <Orderhistory {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/myProfile"
//               name="Profile"
//               render={(props) => <Profile {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/addMenu"
//               name="addMenu"
//               render={(props) => <AddMenu {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/viewMenu"
//               name="viewMenu"
//               render={(props) => <ViewMenu {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/addInventory"
//               name="addInventory"
//               render={(props) => <AddInventory {...props} />}
//             />
//             <Route
//               exact
//               path="/manageEmployees/viewInv"
//               name="viewInv"
//               render={(props) => <ViewInv {...props} />}
//             />
//           </Switch>
//         </React.Suspense>
//       </BrowserRouter>
//     )
//   }
// }

function App() {
  let [flag, setFlag] = useState(false)
  let [data, setData] = useState()
  const [validated, setValidated] = useState(false)
  let [email, setEmail] = useState(null)
  let [name, setName] = useState(null)

  socket.onmessage = function ({ data }) {
    const packet = JSON.parse(data)
    try {
      switch (packet.type) {
        case 'cash req':
          console.log('CASH REQUEST RECIEVED FROM SERVER')
          setData([packet.content[0], packet.content[1], packet.content[2]])
          //data = [packet.content[0], packet.content[2], packet.content[2]]
          setFlag(true)
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  function processPayment() {
    console.log('Test Point 3')
    let em = email
    let nm = name

    if (email === '') {
      em = null
    }

    if (name === null && email != null) {
      nm = email
    }

    let post_data = {
      order_id: data[0],
      table_id: data[1],
      amount: data[2],
      email: em,
      payment_method: 'cash',
      name: nm,
    }

    console.log(post_data)

    fetch('http://' + ip + ':5000/api/payment', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post_data),
    }).then((result) => {
      console.warn('result', result)
      if (result.status === 200) {
        alert('Payment Has been Processed.')
      }
    })

    console.log('Test Point 4')
  }

  const handleSubmit = (event) => {
    console.log('Test Point 1')
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      //if Errors
      console.log('Test Point 2 (negative)')
      event.preventDefault()
      event.stopPropagation()
    } else {
      //if All things okya
      event.preventDefault()
      event.stopPropagation()
      console.log('Test Point 2 (Positive)')
      console.log('All Things okay')
      processPayment()
      setValidated(true)
    }
  }

  return (
    <>
      {flag ? (
        <CModal
          backdrop="static"
          visible={flag}
          onClose={() => {
            setFlag(false)
          }}
        >
          <CModalHeader>
            <CModalTitle>Accept Payment By Cash</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* Order Id: {data[0]} Table ID: {data[1]} Amount: {data[2]} */}
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={4}>
                <CFormInput
                  type="text"
                  defaultValue={data[0]}
                  id="validCustom01"
                  label="Order ID"
                  required
                  disabled
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  defaultValue={data[1]}
                  id="validCustom02"
                  label="Table ID"
                  required
                  disabled
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  defaultValue={data[2]}
                  id="validCustom03"
                  label="Amount To Be Paid"
                  required
                  disabled
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  aria-describedby="validCustom04Feedback"
                  feedbackInvalid="Please provide a valid Email."
                  id="validCustom04"
                  label="Email (Optional)"
                  placeholder="someone@example.com"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault()
                    setEmail(e.target.value)
                  }}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  aria-describedby="validCustom05Feedback"
                  id="validCustom05"
                  label="Full Name (Optional)"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault()
                    setName(e.target.value)
                  }}
                />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit form
                </CButton>
              </CCol>
            </CForm>
          </CModalBody>
          {/* <CModalFooter>
            <CButton
              color="secondary"
              onClick={(e) => {
                e.preventDefault()
                setFlag(false)
              }}
            >
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter> */}
        </CModal>
      ) : (
        <></>
      )}
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  )
}

export { App, socket, connectUser }
