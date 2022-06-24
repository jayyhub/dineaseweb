import React, { useState } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

function ModalComponentWithParams(props) {
  const [visible1, setVisible1] = useState(false)
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

export default ModalComponentWithParams
