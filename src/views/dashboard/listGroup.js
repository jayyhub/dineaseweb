import React from 'react'
import { CListGroup, CListGroupItem, CCol } from '@coreui/react'

function ListGroup(props) {
  let d = { ...props }

  return (
    <div>
      <CListGroup>
        <CListGroupItem component="button">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CCol
              xs={1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Order ID
            </CCol>
            <CCol
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Chef Name
            </CCol>
            <CCol
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Order Rating
            </CCol>
            <CCol
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Order Review
            </CCol>
            <CCol
              xs={5}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Order Items
            </CCol>
          </div>
        </CListGroupItem>
        {d.value.map((items, index) => {
          return (
            <CListGroupItem key={index} component="button">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CCol
                  xs={1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {items.order_id}
                </CCol>
                <CCol
                  xs={2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {items.users_name}
                </CCol>
                <CCol
                  xs={2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {items.rating}
                </CCol>
                <CCol
                  xs={2}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {items.review}
                </CCol>
                <CCol
                  xs={5}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {items.order_items}
                </CCol>
              </div>
            </CListGroupItem>
          )
        })}
      </CListGroup>
    </div>
  )
}

export default ListGroup
