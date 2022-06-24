import React, { useEffect, useState, createRef } from 'react'
import { CContainer } from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
const ip = process.env.REACT_APP_ADDR

// CODE FOR AWS
async function postImage({ image, description }) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)
  formData.append('item_id', null)
  formData.append('request_method', 'POST')

  const result = await fetch('http://' + ip + ':5000/api/images', {
    method: 'POST',
    body: formData,
  })

  // console.log('Image Upload Ho Gayi')
  // console.log(result)
  //const rj = await result
  return result
}
// CODE FOR AWS

function AddMenu() {
  const [item_name, setitemname] = useState('')
  const [item_description, setdesc] = useState('')
  const [menu_status, setstatus] = useState('')
  const [icategory_id, setcat] = useState('')
  const [cat_name, setCatName] = useState('')
  const [category_id, setfood] = useState('')
  const [icat_name, setiCatName] = useState('')
  const [item_price1, setprice] = useState('')
  const [inameerr, setierr] = useState(false)

  // {CODE FOR AWS}
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  // {CODE FOR AWS}

  //FOR IMAGE RENDER
  const [x, setX] = useState(null)

  const [data1, setData1] = useState([])
  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/foodcategories`).then((result) => {
      result.json().then((resp) => {
        //console.warn('result', resp)
        setData1(resp)
      })
    })
  }, [])

  // const [data2, setData2] = useState([])
  // useEffect(() => {
  //   fetch(`http://` + ip + `:5000/api/itemcategories`).then((result) => {
  //     result.json().then((resp) => {
  //       setData2(resp)
  //     })
  //   })
  // }, [])

  async function fetchicat(cat_id) {
    // let result = await fetch(
    //   `http://` + ip + `:5000/api/itemcategories/${encodeURIComponent(cat_id)}`,
    // )
    let result = await fetch(`http://` + ip + `:5000/api/itemcategories/${cat_id}`)
    let resp = await result.json()
    setData2(resp)
  }

  const [data2, setData2] = useState([])

  async function saveEmp() {
    console.log('In Inserting State')
    const item_price = Number(item_price1)
    console.log('Item Price', item_price)
    //PUT IMAGE TO CLOUD
    let rsult = await postImage({ image: file, description })
    //FROM THE RECIEVED KEY INSERT INTO IMAGES
    //RECIEVE THE IMAGE_ID
    let mk = await rsult.json()
    console.log('FiNALL cALL')
    console.log(mk)
    // console.log(mk['rp'])
    // console.log(mk['image_id'])
    //console.log(rsult.body)
    //USE THAT IMAGE_ID TO CREATE A NEW RECORD IN ITEMS
    let image_id = mk
    let data = {
      item_name,
      item_price,
      item_description,
      menu_status,
      image_id,
      category_id,
      icategory_id,
    }
    //console.log('NEWLY CREATED CHECK POINT')
    //console.log(data)
    fetch(`http://` + ip + `:5000/api/menu`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => {
      //console.warn('result', result)
      result.json().then((resp) => {
        //console.warn('resp', resp)
      })
    })
    alert('Menu has been added.')
  }

  async function CheckItemName() {
    let result = await fetch(
      `http://` + ip + `:5000/api/verifyitemname?i_name=${encodeURIComponent(item_name)}`,
    )
    let resp = await result.json()
    if (resp === false) {
      //if item name does not exist
      console.log('Checking Stage Passed')
      setierr(false)
      saveEmp()
    } else setierr(true)
  }

  function MenuAddHandler(e) {
    e.preventDefault()
    if (/^[a-zA-Z ]*$/g.test(item_name))
      if (/^[a-zA-Z ,]*$/g.test(item_description))
        if (/^[0-9]+$/g.test(item_price1))
          //if All Regular expressions gets satified
          CheckItemName()
        else {
          alert(item_price1 + ' should contain digits only')
          return false
        }
      else {
        alert(item_description + ' should contain alphabets only')
        return false
      }
    else {
      alert(item_name + ' should contain alphabets only')
      return false
    }
  }

  // {CODE FOR AWS}
  const fileSelected = (event) => {
    const file = event.target.files[0]
    setFile(file)
    setX(URL.createObjectURL(file))
  }

  const submit = async (event) => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    //console.log('I am Clicked')
    //setImages([])
  }
  // {CODE FOR AWS}

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3 m-2">
            <CContainer lg>
              <h3>
                <u>Add a new Menu Item</u>
              </h3>
              {/* <form className="row g-3" onSubmit={saveEmp}> */}
              <div className="row">
                <form className="row g-1" onSubmit={MenuAddHandler}>
                  <div className="col">
                    <div className="col-md-12">
                      <label htmlFor="inputEmail4" className="form-label">
                        Item Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        //pattern="[A-Za-z]+"
                        value={item_name}
                        onChange={(e) => {
                          setitemname(e.target.value)
                        }}
                        id="inputEmail4"
                      ></input>
                      {inameerr ? (
                        <div style={{ color: 'red' }}>Item Name Already Exist</div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="inputState" className="form-label">
                        Menu Status
                      </label>
                      <select
                        id="inputState"
                        className="form-select"
                        value={menu_status}
                        onChange={(e) => {
                          setstatus(e.target.value)
                        }}
                      >
                        <option selected>Choose...</option>
                        <option>available</option>
                        <option>unavailable</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="inputPassword4" className="form-label">
                        Item Description
                      </label>
                      {/* <input
                        type="text"
                        className="form-control"
                        required
                        //pattern="[A-Za-z]+"
                        value={item_description}
                        style={{
                          height: '100px',
                        }}
                        onChange={(e) => {
                          setdesc(e.target.value)
                        }}
                        id="inputPassword4"
                      ></input> */}
                      <textarea
                        type="text"
                        cols="40"
                        rows="4"
                        className="form-control"
                        required
                        //pattern="[A-Za-z]+"
                        value={item_description}
                        onChange={(e) => {
                          setdesc(e.target.value)
                        }}
                        id="inputPassword4"
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">
                          Food Category
                        </label>
                        <select
                          id="inputState"
                          className="form-select"
                          //value={icategory_id}
                          value={cat_name}
                          onChange={(e) => {
                            data1.map((item) => {
                              if (item.category_name === e.target.value) {
                                //console.log('Hello')
                                //console.log(item.category_id)
                                setCatName(e.target.value)
                                setfood(item.category_id)
                                fetchicat(item.category_id)
                              }
                            })
                          }}
                        >
                          <option selected>Choose...</option>
                          {data1.map((items, index) => (
                            <option key={index}> {items.category_name} </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">
                          Item Category
                        </label>
                        <select
                          id="inputState"
                          className="form-select"
                          //value={category_id}
                          value={icat_name}
                          onChange={(e) => {
                            data2.map((item) => {
                              if (item.icategory_name === e.target.value) {
                                //console.log('Hello')
                                //console.log(item.icategory_id)
                                setiCatName(e.target.value)
                                setcat(item.icategory_id)
                              }
                            })
                          }}
                        >
                          <option selected>Choose...</option>
                          {data2.map((items, index) => (
                            <option key={index}> {items.icategory_name} </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputZip" className="form-label">
                        Item Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        //pattern="[1-9]{1}[0-9]{9}"
                        title="Enter 10 digit numbers without 0"
                        value={item_price1}
                        id="inputZip"
                        onChange={(e) => {
                          setprice(e.target.value)
                        }}
                      ></input>
                    </div>
                  </div>
                  <div
                    className="col"
                    style={{
                      // backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      //height: '200px',
                    }}
                  >
                    <div className="row d-flex justify-content-center">
                      <div
                        className="d-flex justify-content-center"
                        // style={{ backgroundColor: 'red' }}
                        style={{
                          border: '3px Solid Black',
                          width: '500px',
                          height: '250px',
                          marginBottom: '5px',
                          borderRadius: '7px',
                          //backgroundColor: 'red',
                        }}
                      >
                        <img src={x} alt="add Menu" />
                        {/* HELLO */}
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        // style={{ backgroundColor: 'blue' }}
                        style={{
                          marginBottom: '5px',
                          marginTop: '5px',
                        }}
                      >
                        <input onChange={fileSelected} type="file" accept="image/*"></input>
                        {/* HELLO */}
                      </div>
                      <div
                        className="d-flex justify-content-center"
                        // style={{ backgroundColor: 'green' }}
                        style={{
                          marginTop: '5px',
                        }}
                      >
                        <input
                          style={{ borderRadius: '5px' }}
                          placeholder="Description For Image"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          type="text"
                        ></input>
                        {/* HELLO */}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: '200px',
                      }}
                    >
                      Add Menu
                    </button>
                  </div>
                </form>
              </div>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default AddMenu
