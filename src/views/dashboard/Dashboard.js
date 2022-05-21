import React, { lazy, useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import {
  // CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CHeaderText,
  CImage,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
  CChart,
  CListGroup,
  CListGroupItem,
  CWidgetStatsA,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsD,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
//import { CChart } from '@coreui/Users'
import './dashboard.css'
import { CChartDoughnut, CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilArrowTop,
} from '@coreui/icons'

const Dashboard = (props) => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  //console.log('page2')
  //console.log(props)
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer>
              <CRow>
                <CCol xl={7}>
                  <h1>Dashboard</h1>
                  <h3>Statistics</h3>
                  <CContainer
                    style={{
                      border: '2px solid grey',
                      borderRadius: '12px',
                      marginTop: '0%',
                      marginBottom: '1%',
                      //overflow: 'hidden',
                      height: '43%',
                      padding: '0px',
                    }}
                  >
                    <CRow>
                      <CCol xs={4}>
                        <CChartDoughnut
                          //style={{ margin: '0px', padding: '0px' }}
                          data={{
                            //labels: ['VueJs'],
                            datasets: [
                              {
                                backgroundColor: ['#41B883', '#FFFFFF'],
                                data: [40, 100],
                              },
                            ],
                          }}
                        />
                        <h6 style={{ textAlign: 'center' }}>Text 1</h6>
                      </CCol>
                      <CCol xs={4}>
                        <CChartDoughnut
                          data={{
                            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                            datasets: [
                              {
                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                data: [40, 20, 80, 10],
                              },
                            ],
                          }}
                        />
                      </CCol>
                      <CCol xs={4}>
                        <CChartDoughnut
                          data={{
                            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                            datasets: [
                              {
                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                data: [40, 20, 80, 10],
                              },
                            ],
                          }}
                        />
                      </CCol>
                    </CRow>
                  </CContainer>
                  <h3>Recent Orders</h3>
                  <CContainer
                    style={{
                      border: '2px solid grey',
                      borderRadius: '12px',
                      marginTop: '0%',
                      marginBottom: '0%',
                      overflow: 'hidden',
                      height: '34%',
                      padding: '0px',
                    }}
                  >
                    <CRow>
                      <CListGroup>
                        <CListGroupItem component="button" active>
                          Cras justo odio
                        </CListGroupItem>
                        <CListGroupItem component="button">Dapibus ac facilisis in</CListGroupItem>
                        <CListGroupItem component="button">Morbi leo risus</CListGroupItem>
                        <CListGroupItem component="button">Porta ac consectetur ac</CListGroupItem>
                        <CListGroupItem component="button" disabled>
                          Vestibulum at eros
                        </CListGroupItem>
                      </CListGroup>
                    </CRow>
                  </CContainer>
                  {/* <CRow>
                    <CContainer
                      style={{
                        border: '2px solid grey',
                        borderRadius: '12px',
                        marginTop: '2%',
                        marginBottom: '2%',
                        overflow: 'hidden',
                      }}
                    >
                      <CListGroup>
                        <CListGroupItem component="button" active>
                          Cras justo odio
                        </CListGroupItem>
                        <CListGroupItem component="button">Dapibus ac facilisis in</CListGroupItem>
                        <CListGroupItem component="button">Morbi leo risus</CListGroupItem>
                        <CListGroupItem component="button">Porta ac consectetur ac</CListGroupItem>
                        <CListGroupItem component="button" disabled>
                          Vestibulum at eros
                        </CListGroupItem>
                      </CListGroup>
                    </CContainer>
                  </CRow> */}
                </CCol>
                <CCol xl={5}>
                  {/* <CChartDoughnut
                    data={{
                      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                      datasets: [
                        {
                          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                          data: [40, 20, 80, 10],
                        },
                      ],
                    }}
                  /> */}
                  <CRow>
                    <h3>Order Complains</h3>
                    <CContainer
                      style={{
                        border: '2px solid grey',
                        borderRadius: '12px',
                        marginTop: '0%',
                        marginBottom: '0.5%',
                        height: '230px',
                        padding: '0%',
                        backgroundColor: '#d9d9d9',
                      }}
                    >
                      <CTable striped responsive color="danger">
                        <CTableHead color="dark">
                          <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow>
                            <CTableHeaderCell scope="row">1</CTableHeaderCell>
                            <CTableDataCell>Mark</CTableDataCell>
                            <CTableDataCell>Otto</CTableDataCell>
                            <CTableDataCell>@mdo</CTableDataCell>
                            <CTableDataCell>Otto</CTableDataCell>
                            <CTableDataCell>@mdo</CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableHeaderCell scope="row">2</CTableHeaderCell>
                            <CTableDataCell>Jacob</CTableDataCell>
                            <CTableDataCell>Thornton</CTableDataCell>
                            <CTableDataCell>@fat</CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableHeaderCell scope="row">3</CTableHeaderCell>
                            <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                            <CTableDataCell>@twitter</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CContainer>
                  </CRow>
                  <CRow>
                    <h3>Insights</h3>
                    <CContainer
                      style={{
                        border: '2px solid grey',
                        borderRadius: '12px',
                        marginTop: '0%',
                        marginBottom: '0%',
                        height: '300px',
                        padding: '0.5%',
                        backgroundColor: '#d9d9d9',
                        overflow: 'hidden',
                      }}
                    >
                      <CRow>
                        <CCol xs={6}>
                          <CWidgetStatsB
                            className="mb-3"
                            progress={{ color: 'success', value: 75 }}
                            text="Widget helper text"
                            title="Widget title"
                            value="89.9%"
                          />
                        </CCol>
                        <CCol xs={6}>
                          <CWidgetStatsB
                            className="mb-3"
                            progress={{ color: 'success', value: 75 }}
                            text="Widget helper text"
                            title="Widget title"
                            value="89.9%"
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs={6}>
                          <CWidgetStatsA
                            className="mb-4"
                            color="danger"
                            value={
                              <>
                                $9.000{' '}
                                <span className="fs-6 fw-normal">
                                  (40.9% <CIcon icon={cilArrowTop} />)
                                </span>
                              </>
                            }
                            title="Widget title"
                            chart={
                              <CChartBar
                                className="mt-3 mx-3"
                                style={{ height: '40px' }}
                                data={{
                                  labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                  ],
                                  datasets: [
                                    {
                                      label: 'My First dataset',
                                      backgroundColor: 'rgba(255,255,255,.2)',
                                      borderColor: 'rgba(255,255,255,.55)',
                                      data: [
                                        78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67,
                                        82,
                                      ],
                                      barPercentage: 0.6,
                                    },
                                  ],
                                }}
                                options={{
                                  maintainAspectRatio: false,
                                  plugins: {
                                    legend: {
                                      display: false,
                                    },
                                  },
                                  scales: {
                                    x: {
                                      grid: {
                                        display: false,
                                        drawTicks: false,
                                      },
                                      ticks: {
                                        display: false,
                                      },
                                    },
                                    y: {
                                      grid: {
                                        display: false,
                                        drawBorder: false,
                                        drawTicks: false,
                                      },
                                      ticks: {
                                        display: false,
                                      },
                                    },
                                  },
                                }}
                              />
                            }
                          />
                        </CCol>
                        <CCol xs={6}>
                          <CWidgetStatsE
                            className="mb-3"
                            style={{ height: '86%', width: '100%' }}
                            chart={
                              <CChartBar
                                className="mx-auto"
                                style={{ height: '30px', width: '80px' }}
                                data={{
                                  labels: [
                                    'M',
                                    'T',
                                    'W',
                                    'T',
                                    'F',
                                    'S',
                                    'S',
                                    'M',
                                    'T',
                                    'W',
                                    'T',
                                    'F',
                                    'S',
                                    'S',
                                    'M',
                                  ],
                                  datasets: [
                                    {
                                      backgroundColor: '#321fdb',
                                      borderColor: 'transparent',
                                      borderWidth: 1,
                                      data: [
                                        41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47,
                                      ],
                                    },
                                  ],
                                }}
                                options={{
                                  maintainAspectRatio: false,
                                  plugins: {
                                    legend: {
                                      display: false,
                                    },
                                  },
                                  scales: {
                                    x: {
                                      display: false,
                                    },
                                    y: {
                                      display: false,
                                    },
                                  },
                                }}
                              />
                            }
                            title="Widget title"
                            value="89.9%"
                          />
                        </CCol>
                      </CRow>
                    </CContainer>
                  </CRow>
                </CCol>
              </CRow>
              {/* <CHeaderText className="welcome ml-xl-3" align="middle">
                Welcome to the DineEase System
              </CHeaderText> */}
              {/* <CChartDoughnut
                data={{
                  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                  datasets: [
                    {
                      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                      data: [40, 20, 80, 10],
                    },
                  ],
                }}
              /> */}
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
      {/* <CImage align="start" rounded src="/src/assets/logo.png" width={200} height={200} /> */}
    </>
  )
}

export default Dashboard
