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
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
function ViewMenu() {
  const [item_name, setitemname] = useState('')
  const [item_description, setdesc] = useState('')
  const [menu_status, setstatus] = useState('')
  const [item_id, setitemId] = useState(null)
  const [category_id, setcat] = useState('')
  const [icategory_id, setfood] = useState('')
  const [item_price, setprice] = useState('')
  const [image_id, setimg] = useState('')
  const [data, setData] = useState([])
  const [r, setr] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/amenu').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData(resp)
      })
    })
  }, [r])

  const [data1, setCata] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/itemcategories').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setCata(resp)
      })
    })
  }, [])

  const [data2, setFata] = useState([])
  useEffect(() => {
    fetch('http://192.168.1.108:5000/api/foodcategories').then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setFata(resp)
      })
    })
  }, [])

  console.warn(data)
  //const viewEmployee = () => {
  //eeeee
  function updateInv(
    item_id,
    item_name,
    item_price,
    item_description,
    menu_status,
    image_id,
    category_id,
    icategory_id,
  ) {
    image_id = 1
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
    // console.log(item)
    console.warn('item', JSON.stringify(item))
    fetch(`http://192.168.1.108:5000/api/menu/${item_id}`, {
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
      }
      // result.json().then((resp) => {
      //   console.log('who are you')
      //   console.warn(resp)
      //   setr(resp)
      // })
    })
  }

  function getUser(id) {
    console.log(id)
    fetch(`http://192.168.1.108:5000/api/menu/${id}`).then((result) => {
      result.json().then((resp) => {
        console.warn('hey')
        setitemname(resp[0].item_name)
        setitemId(resp[0].item_id)
        setdesc(resp[0].item_description)
        setprice(resp[0].item_price)
        setstatus(resp[0].menu_status)
        setimg(resp[0].image_id)
        setcat(resp[0].category_id)
        setfood(resp[0].icategory_id)
      })
    })
  }

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <div className="half">
                <CTable striped>
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
                    {data.map((items, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell>
                        <CTableDataCell> {items.item_name} </CTableDataCell>
                        <CTableDataCell> {items.item_price} </CTableDataCell>
                        <CTableDataCell> {items.menu_status} </CTableDataCell>
                        <CTableDataCell> {items.item_description} </CTableDataCell>
                        <CTableDataCell>
                          {/* <button onClick={() => selectUser(items.inventory_id)}>Edit</button> */}
                          <button onClick={() => getUser(items.item_id)}>Edit</button>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>

              <input
                type="text"
                className="rocket msp"
                placeholder="Item Name"
                value={item_name}
                onChange={(e) => {
                  setitemname(e.target.value)
                }}
              />
              <input
                type="text"
                className="rocket msp"
                placeholder="Item Price"
                value={item_price}
                onChange={(e) => {
                  setprice(e.target.value)
                }}
              />
              <input
                type="text"
                className="rocket msp"
                placeholder="Item Description"
                value={item_description}
                onChange={(e) => {
                  setdesc(e.target.value)
                }}
              />

              <select
                id="inputState"
                className="form-select rocket msp"
                value={menu_status}
                onChange={(e) => {
                  setstatus(e.target.value)
                }}
              >
                <option selected>Menu Status</option>
                <option>available</option>
                <option>not available</option>
              </select>

              <select
                id="inputState"
                className="form-select rocket msp it"
                value={category_id}
                onChange={(e) => {
                  data1.map((item) => {
                    if (item.category_name === e.target.value) {
                      console.log('Hello')
                      console.log(item.category_id)
                      setcat(item.category_id)
                    }
                  })
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
                value={icategory_id}
                onChange={(e) => {
                  data2.map((item) => {
                    if (item.category_name === e.target.value) {
                      console.log('Hello')
                      console.log(item.category_id)
                      setfood(item.category_id)
                    }
                  })
                }}
              >
                <option selected>Food Category</option>
                {data2.map((items, index) => (
                  <option key={index}> {items.category_name} </option>
                ))}
              </select>
              <button
                className="butn"
                onClick={() =>
                  updateInv(
                    item_id,
                    item_name,
                    item_price,
                    item_description,
                    menu_status,
                    image_id,
                    category_id,
                    icategory_id,
                  )
                }
              >
                Update Inventory
              </button>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default ViewMenu
