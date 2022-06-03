import { React, useState } from 'react'
import {
  CWidgetStatsB,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CForm,
  CFormFeedback,
} from '@coreui/react'

function StatWidgetB(props) {
  let d = { ...props }
  let [visible, setVisible] = useState(false)
  let [validated, setValidated] = useState(false)

  let [prog_val, set_val] = useState(100)
  let [trg, serTrg] = useState('')
  let [trg1, serTrg1] = useState('')

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   //setVisible(!visible)
  //   return (
  //     <>
  //       <CModal visible={visible} onClose={() => setVisible(false)}>
  //         <CModalHeader onClose={() => setVisible(false)}>
  //           <CModalTitle>Modal title</CModalTitle>
  //         </CModalHeader>
  //         <CModalBody>Woohoo, you are reading this text in a modal!</CModalBody>
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

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
    } else if (form.checkValidity() === true) {
      console.log('All Things Okay')
      setVisible(false)
      if (d.text === 'Current Employees') {
        set_val(trg)
      } else {
        set_val(trg1)
      }
    } else {
      //else condition here
    }
    setValidated(true)
    event.preventDefault()
  }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Set Target</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit} validated={validated}>
            <CFormInput
              id="TargetInput1"
              type="text"
              placeholder="Enter a number greater than 0"
              pattern="[1-9][0-9]*"
              required
              onChange={(e) => {
                if (d.text === 'Current Employees') {
                  serTrg(e.target.value)
                } else {
                  serTrg1(e.target.value)
                }
              }}
            />
            <CFormFeedback invalid>Only digits allowed</CFormFeedback>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
      <CWidgetStatsB
        className="m-1"
        progress={{ color: 'success', value: (d.value / prog_val) * 100 }}
        text={'Next Target: ' + prog_val}
        title={d.text}
        value={d.value}
        onClick={(e) => {
          e.preventDefault()
          setVisible(true)
        }}
      />
    </>
  )
}

export default StatWidgetB
