import { React, useState } from 'react'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

function ModalComponent(props) {
  const [visible1, setVisible1] = useState(true)

  return (
    <>
      <CModal backdrop="static" visible={visible1} onClose={() => setVisible1(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          I will not close if you click outside me. Donot even try to press escape key.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible1(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalComponent
