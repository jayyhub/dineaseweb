import React from 'react'
import './viewMenu.css'
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
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CFormInput,
  CInputGroup,
  CFormSelect,
  CForm,
  CInputGroupText,
  CFormCheck,
  CFormFeedback,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import { RegExp } from 'core-js'
function ViewMenu() {
  //RESPONSE DETAILS
  const [item_id, setitemId] = useState(null)
  ////FORM DETAILS
  const [item_name, setitemname] = useState('')
  const [dup_item_name, setdup] = useState('')
  const [item_description, setdesc] = useState('')
  const [item_price, setprice] = useState('')
  const [menu_status, setstatus] = useState('')
  //const [icategory_id, setcat] = useState('')
  const [icategory_nam, seticatnam] = useState('')
  //const [category_id, setfood] = useState('')
  const [category_nam, setfoodnam] = useState('')
  ////FROM DETAILS END
  const [image_id, setimg] = useState('')
  ////MENU RESPONSE DETAILS
  const [data, setData] = useState([])
  ////MENU RESPONSE DETAILS END
  //RESPONSE DETAILS END
  //ERROR HANDLERS
  const [ierr, setierr] = useState(false)

  const [itemnameerr, setinameerr] = useState(false)
  const [itempriceerr, setiprceerr] = useState(false)
  const [itemdescerr, setidscerr] = useState(false)
  const [formerr, setformerr] = useState([false, false, false])
  const [r, setr] = useState([])
  const [indiv_data, setIndivData] = useState([])
  const ip = process.env.REACT_APP_ADDR

  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/amenu`).then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }, [r])

  const [data1, setCata] = useState([])
  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/itemcategories`).then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setCata(resp)
      })
    })
  }, [])

  const [data2, setFata] = useState([])
  useEffect(() => {
    fetch('http://' + ip + ':5000/api/foodcategories').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setFata(resp)
      })
    })
  }, [])

  async function CheckItemName() {
    if (item_name != dup_item_name) {
      let result = await fetch(
        `http://` + ip + `:5000/api/verifyitemname?i_name=${encodeURIComponent(item_name)}`,
      )
      let resp = await result.json()
      if (resp === false) {
        //if item name does not exist
        setierr(false)
        updateInv()
      } else setierr(true)
    } else {
      setierr(false)
      updateInv()
    }
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    //console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      //setValidated(x)
      event.preventDefault()
      //event.stopPropagation()
    } else if (form.checkValidity() === true) {
      //Update Inventory Function call here
      console.log('All Things Okay')
      CheckItemName()
      //event.preventDefault()
    } else {
      //else condition here
    }
    //console.log('Hello')
    setValidated(true)
    event.preventDefault()
  }

  // console.warn(data)
  // console.warn(data1)
  // console.warn(data2)
  //const viewEmployee = () => {
  //eeeee
  function HandleItemDetails() {
    // if (item_name.length > 0) {
    //   if (item_price.length > 0) {
    //     if (item_description.length > 0) {
    //       console.log('Hello')
    //     } else {
    //       // setinameerr(true)
    //       console.log('item description error')
    //       setformerr([false, false, true])
    //     }
    //   } else {
    //     //setinameerr(true)
    //     console.log('item price error')
    //     setformerr([false, true, false])
    //   }
    // } else {
    //   //setinameerr(true)
    //   console.log('item name error')
    //   setformerr([true, false, false])
    // }

    if (item_name.length <= 0) {
      //console.log('item_name error')
      formerr[0] = true
      setformerr(formerr)
    } else {
    }
    if (item_price.length <= 0) {
      //console.log('item_price error')
      formerr[1] = true
      setformerr(formerr)
    } else {
    }
    if (item_description.length <= 0) {
      //console.log('item_description error')
      formerr[2] = true
      setformerr(formerr)
    } else {
    }
    if (formerr[0] === false && formerr[1] === false && formerr[2] === false) {
      console.log('Hello')
    }
  }

  function updateInv() {
    //image_id = 1
    let icategory_id = null
    let category_id = null
    data1.map((item) => {
      if (item.icategory_name === icategory_nam) {
        icategory_id = item.icategory_id
      }
    })

    data2.map((item) => {
      if (item.category_name === category_nam) {
        category_id = item.category_id
      }
    })

    let item = {
      item_id,
      item_name,
      item_price,
      item_description,
      menu_status,
      image_id,
      category_id,
      icategory_id,
    }
    // console.log('you')
    //console.log(item)
    //console.warn('item', JSON.stringify(item))
    fetch(`http://` + ip + `:5000/api/menu/${item_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((result) => {
      console.log(result)
      if (result.status === 200) {
        console.log('meme')
        setr('')
        alert('Menu has been Updated.')
      }
      // result.json().then((resp) => {
      //   console.log('who are you')
      //   console.warn(resp)
      //   setr(resp)
      // })
    })
  }

  function getItemDetails(id) {
    // let icat_nam = null
    // let fcat_nam = null
    //console.log(id)
    fetch(`http://` + ip + `:5000/api/menu/${id}`).then((result) => {
      result.json().then((resp) => {
        //console.warn('hey')

        setitemname(resp[0].item_name)
        setdup(resp[0].item_name)
        setitemId(resp[0].item_id)
        setdesc(resp[0].item_description)
        setprice(resp[0].item_price)
        setstatus(resp[0].menu_status)
        setimg(resp[0].image_id)
        //console.log('TET POINT FOR ITEM CATEGORY NAME')
        data1.map((item) => {
          if (item.icategory_id === resp[0].icategory_id) {
            //console.log(item.icategory_name)
            //icat_nam = item.icategory_name
            seticatnam(item.icategory_name)
          }
        })
        //console.log('TET POINT FOR FOOD CATEGORY NAME')
        data2.map((item) => {
          if (item.category_id === resp[0].category_id) {
            //console.log(item.category_name)
            //fcat_nam = item.category_name
            setfoodnam(item.category_name)
          }
        })
        // console.log('TEST POINT FOR BOTH')
        // console.log(icat_nam)
        // console.log(fcat_nam

        //console.log(resp[0])
        //setIndivData(resp[0])

        // console.log('TEST POINT')
        // console.log(resp[0])
        // console.log(resp[0].icategory_id)
        // console.log(resp[0].category_id)
      })
    })
  }

  return (
    <>
      <div>
        <AppSidebar />
        {/*<div className="wrapper d-flex flex-column min-vh-100 bg-light">*/}
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer xl>
              <h3>Menu List</h3>
              <div className="half">
                <CTable striped align="middle">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">ItemID</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Item Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Item Price</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Item Description</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                        <CTableDataCell> {item.item_name} </CTableDataCell>
                        <CTableDataCell> {item.item_price} </CTableDataCell>
                        <CTableDataCell> {item.menu_status} </CTableDataCell>
                        <CTableDataCell> {item.item_description} </CTableDataCell>
                        <CTableDataCell>
                          {/* <button onClick={() => selectUser(items.inventory_id)}>Edit</button> */}
                          <CButton
                            id="edit-button"
                            onClick={() => getItemDetails(item.item_id)}
                            color="secondary"
                            style={{ margin: '2%' }}
                          >
                            Edit
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>

              <h3>Edit Menu Item</h3>
              <CContainer
                style={{
                  border: '2px solid grey',
                  borderRadius: '12px',
                  marginTop: '0%',
                  marginBottom: '1%',
                  overflow: 'hidden',
                }}
              >
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  style={{ margin: '0%' }}
                >
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidation01">Item Name</CFormLabel>
                    <CFormInput
                      type="text"
                      //defaultValue="Item Name"
                      aria-describedby="ItemValidation01Feedback"
                      feedbackInvalid="Item Name Should Contain Only Aplhabets"
                      pattern="[A-z a-z]+"
                      placeholder="Item Name"
                      value={item_name}
                      //invalid
                      //feedbackValid="Looks good!"
                      id="ItemValidation01"
                      //label="Item Name"
                      required
                      onInvalid={(e) => {
                        console.log('YE INVALID HE')
                      }}
                      onChange={(e) => {
                        setierr(false)
                        setitemname(e.target.value)
                        // indiv_data.item_name = e.target.value
                        // console.log(indiv_data.item_name)
                        // setIndivData(indiv_data)
                      }}
                    />
                    {ierr ? (
                      <CFormLabel style={{ color: 'red' }}>Item Name Already Exist</CFormLabel>
                    ) : (
                      <CFormFeedback invalid>Only alphabetic characters allowed</CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidation02">Item Price</CFormLabel>
                    <CFormInput
                      type="text"
                      //defaultValue="Item Price"
                      pattern="[1-9][0-9]+"
                      placeholder="Item Price"
                      //feedbackValid="Looks good!"
                      feedbackInvalid="Item Price Should Contain Only Digits"
                      id="ItemValidation02"
                      label="Item Price"
                      required
                      value={item_price}
                      onChange={(e) => {
                        setprice(e.target.value)
                        // indiv_data.item_price = e.target.value
                        // setIndivData(indiv_data)
                      }}
                    />
                    <CFormFeedback invalid>Only digits allowed</CFormFeedback>
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="ItemValidation03">Item Description</CFormLabel>
                    <CFormInput
                      type="text"
                      //defaultValue="Item Description"
                      pattern="[A-z a-z,.]+"
                      placeholder="Item Description"
                      //aria-describedby="inputGroupPrependFeedback"
                      //feedbackValid="Please choose a username."
                      feedbackInvalid="Item Description Should Contain Only Aplhabets"
                      id="ItemValidation03"
                      label="Item Description"
                      required
                      value={item_description}
                      onChange={(e) => {
                        setdesc(e.target.value)
                        // indiv_data.item_description = e.target.value
                        // setIndivData(indiv_data)
                      }}
                    />
                    <CFormFeedback invalid>Only alphabetic characters allowed</CFormFeedback>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidation04">Menu Status</CFormLabel>
                    <CFormSelect
                      //aria-describedby="validationCustom04Feedback"
                      feedbackInvalid="Please select a Menu Status"
                      id="ItemValidation04"
                      label="Menu Status"
                      required
                      pattern="/^(?!Menu Status).*/g"
                      value={menu_status}
                      onChange={(e) => {
                        // console.log('TEST FOR MENU STATUS')
                        setstatus(e.target.value)
                        // indiv_data.menu_status = e.target.value
                        // // console.log(indiv_data[0].menu_status)
                        // setIndivData(indiv_data)
                      }}
                    >
                      <option selected value="">
                        Menu Status
                      </option>
                      <option>available</option>
                      <option>unavailable</option>
                    </CFormSelect>
                    <CFormFeedback invalid>Please Select a menu status</CFormFeedback>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidation05">Item Category</CFormLabel>
                    <CFormSelect
                      aria-describedby="validationCustom05Feedback"
                      //feedbackInvalid="Please select a valid state."
                      id="validationCustom05"
                      label="Item Category"
                      required
                      pattern="/^(?!(Item Category)$).*/g"
                      value={icategory_nam}
                      onChange={(e) => {
                        // data1.map((item) => {
                        //   if (item.icategory_name === e.target.value) {
                        //     console.log('Hello')
                        //     console.log(item.icategory_id)
                        //     setcat(item.icategory_id)
                        //   }
                        // })
                        //setIndivData([indiv_data[0], e.target.value, indiv_data[2]])
                        // indiv_data.icategory_name = e.target.value
                        // setIndivData(indiv_data)
                        seticatnam(e.target.value)
                      }}
                    >
                      <option selected value="">
                        Item Category
                      </option>
                      {data1.map((items, index) => (
                        <option key={index}> {items.icategory_name} </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Please Select an Item Category</CFormFeedback>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="ItemValidation06">Food Category</CFormLabel>
                    <CFormSelect
                      aria-describedby="validationCustom06Feedback"
                      //feedbackInvalid="Please select a valid state."
                      id="validationCustom06"
                      label="Food Category"
                      required
                      pattern="/^(?!(Food Category)$).*/g"
                      value={category_nam}
                      onChange={(e) => {
                        // console.log('TESTPOINT')
                        // console.log(e.target.value)
                        // data2.map((item) => {
                        //   if (item.category_name === e.target.value) {
                        //     console.log('Hello')
                        //     console.log(item.category_id)
                        //     setfood(item.category_id)
                        //   }
                        // })
                        //setIndivData([indiv_data[0], indiv_data[1], e.target.value])
                        // indiv_data.category_name = e.target.value
                        // setIndivData(indiv_data)
                        setfoodnam(e.target.value)
                      }}
                    >
                      <option selected value="">
                        Food Category
                      </option>
                      {data2.map((items, index) => (
                        <option key={index}> {items.category_name} </option>
                      ))}
                    </CFormSelect>
                    <CFormFeedback invalid>Please Select a Food Category</CFormFeedback>
                  </CCol>
                  <CCol xs={4}>
                    <CFormCheck
                      type="checkbox"
                      id="invalidCheck"
                      label="Confirm Changes"
                      required
                    />
                    <CFormFeedback invalid>
                      You must check the checkbox before submitting.
                    </CFormFeedback>
                  </CCol>
                  <CCol xs={6}>
                    <CButton
                      color="primary"
                      type="submit"
                      style={{
                        marginBottom: '2%',
                        width: '30%',
                      }}
                    >
                      Update
                    </CButton>
                  </CCol>
                </CForm>
              </CContainer>
              {/*LEFT POINT. LOGIC TO CHNAGE TEXT FIELD TO BE IMPLEMENTED*/}
              {/* <CContainer>
                <CRow>
                  <CCol sm={4}>
                    <input
                      type="text"
                      className="rocket msp"
                      placeholder="Item Name"
                      value={item_name}
                      onChange={(e) => {
                        setitemname(e.target.value)
                        // indiv_data.item_name = e.target.value
                        // console.log(indiv_data.item_name)
                        // setIndivData(indiv_data)
                      }}
                    />
                    {formerr[0] ? (
                      <div style={{ color: 'red' }}>Item Name Cannot be Empty</div>
                    ) : (
                      <></>
                    )}
                  </CCol>
                  <CCol sm={4}>
                    <input
                      type="text"
                      className="rocket msp"
                      placeholder="Item Price"
                      value={item_price}
                      onChange={(e) => {
                        setprice(e.target.value)
                        // indiv_data.item_price = e.target.value
                        // setIndivData(indiv_data)
                      }}
                    />
                    {formerr[1] ? (
                      <div style={{ color: 'red' }}>Item Price Cannot be Empty</div>
                    ) : (
                      <></>
                    )}
                  </CCol>
                  <CCol sm={4}>
                    <input
                      type="text"
                      className="rocket msp"
                      placeholder="Item Description"
                      value={item_description}
                      onChange={(e) => {
                        setdesc(e.target.value)
                        // indiv_data.item_description = e.target.value
                        // setIndivData(indiv_data)
                      }}
                    />
                    {formerr[2] ? (
                      <div style={{ color: 'red' }}>Item Description Cannot be Empty</div>
                    ) : (
                      <></>
                    )}
                  </CCol>
                </CRow>
              </CContainer>
              <select
                id="inputState"
                className="form-select rocket msp"
                value={menu_status}
                onChange={(e) => {
                  // console.log('TEST FOR MENU STATUS')
                  setstatus(e.target.value)
                  // indiv_data.menu_status = e.target.value
                  // // console.log(indiv_data[0].menu_status)
                  // setIndivData(indiv_data)
                }}
              >
                <option selected>Menu Status</option>
                <option>available</option>
                <option>unavailable</option>
              </select>

              <select
                id="inputState"
                className="form-select rocket msp it"
                value={icategory_nam}
                onChange={(e) => {
                  // data1.map((item) => {
                  //   if (item.icategory_name === e.target.value) {
                  //     console.log('Hello')
                  //     console.log(item.icategory_id)
                  //     setcat(item.icategory_id)
                  //   }
                  // })
                  //setIndivData([indiv_data[0], e.target.value, indiv_data[2]])
                  // indiv_data.icategory_name = e.target.value
                  // setIndivData(indiv_data)
                  seticatnam(e.target.value)
                }}
              >
                <option selected>Item Category</option>
                {data1.map((items, index) => (
                  <option key={index}> {items.icategory_name} </option>
                ))}
              </select>

              <select
                id="inputState"
                className="form-select rocket msp it"
                value={category_nam}
                onChange={(e) => {
                  // console.log('TESTPOINT')
                  // console.log(e.target.value)
                  // data2.map((item) => {
                  //   if (item.category_name === e.target.value) {
                  //     console.log('Hello')
                  //     console.log(item.category_id)
                  //     setfood(item.category_id)
                  //   }
                  // })
                  //setIndivData([indiv_data[0], indiv_data[1], e.target.value])
                  // indiv_data.category_name = e.target.value
                  // setIndivData(indiv_data)
                  setfoodnam(e.target.value)
                }}
              >
                <option selected>Food Category</option>
                {data2.map((items, index) => (
                  <option key={index}> {items.category_name} </option>
                ))}
              </select>
              <button
                id="update-button"
                className="butn"
                onClick={HandleItemDetails}
                // onClick={() =>
                //   updateInv(
                //     item_id,
                //     item_name,
                //     item_price,
                //     item_description,
                //     menu_status,
                //     image_id,
                //     category_id,
                //     icategory_id,
                //   )
                // }
              >
                Update Inventory
              </button> */}
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default ViewMenu
