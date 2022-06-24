import React, { lazy, useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import {
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
  CListGroup,
  CListGroupItem,
  CWidgetStatsA,
  CWidgetStatsB,
  CWidgetStatsE,
  CSpinner,
  CPlaceholder,
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
import DoughnutChart from './doughnutChart'
import ListGroup from './listGroup'
import Table from './table'
import StatWidgetB from './statWidgetB'
import StatWidgetA from './statWidgetA'
import StatWidgetE from './statWidgetE'
import BarChart from './barChart'
import StatWidgetA1 from './statWidgetA1'
import AnimatedNumber from 'react-animated-numbers'
import ModalComponent from 'src/modalComponent'

const ip = process.env.REACT_APP_ADDR

function roundNearest100(num) {
  return Math.round(num / 100) * 200
}

const Dashboard = (props) => {
  const [db_data, setDbData] = useState([])
  const [stat, setStat] = useState(false)

  const loadingStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '240px',
  }

  const loadingStyle1 = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '150px',
  }

  const centreStyle = {
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    display: 'flex',
    fontSize: '40px',
    fontWeight: 'lighter',
    //height: '180px',
  }

  const divStyle = {
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  }

  const mainDivStyle = {
    backgroundColor: 'white',
    // alignItems: 'center',
    display: 'flex',
    border: '2px solid black',
    height: '100%',
  }

  useEffect(() => {
    fetch(`http://` + ip + `:5000/api/dashboardapi`).then((result) => {
      if (result.status == 200) {
        result.json().then((resp) => {
          console.warn('result', resp)
          setDbData(resp)
          setStat(true)
        })
      }
    })
  }, [])

  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-4">
            {/* <ModalComponent /> */}
            <CRow>
              <CCol xl={7} style={{ padding: '5px' }}>
                <h1>Dashboard</h1>
                <h3>Statistics</h3>
                <div
                  style={{
                    //backgroundColor: 'white',
                    border: '2px solid grey',
                    borderRadius: '12px',
                    padding: '2px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {stat ? (
                    <>
                      <CCol
                        xs={4}
                        style={{
                          //backgroundColor: 'blue',
                          padding: '0px 1px 0px 2px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <DoughnutChart text="Current Orders In Queue" value={db_data[0]} />
                      </CCol>
                      <CCol
                        xs={4}
                        style={{
                          //backgroundColor: 'black',
                          padding: '0px 1px 0px 1px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            borderRadius: '12px',
                            //backgroundColor: '#DDDDDD',
                            padding: '10px',
                            boxShadow:
                              'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                          }}
                        >
                          <div style={{ fontSize: 24 }}>Current Month Sales</div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ fontSize: 40 }}>PKR</div>
                            <div style={{ paddingBottom: '2px' }}>
                              <AnimatedNumber
                                includeComma={true}
                                animateToNumber={db_data[1][0].money_earned}
                                fontStyle={{ fontSize: 40, fontWeight: 600 }}
                                configs={[{ mass: 1, tension: 260, friction: 70 }]}
                              />
                            </div>
                          </div>
                          <div style={{ fontSize: 18 }}>
                            Previous Month: PKR {db_data[1][1].money_earned}
                          </div>
                        </div>
                      </CCol>
                      <CCol
                        xs={4}
                        style={{
                          //backgroundColor: 'brown',
                          padding: '0px 2px 0px 1px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            borderRadius: '12px',
                            backgroundColor: '#DDDDDD',
                            padding: '10px',
                            boxShadow:
                              'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                          }}
                        >
                          <div style={{ fontSize: 24 }}>Current Year Sales</div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ fontSize: 40 }}>PKR</div>
                            <div style={{ paddingBottom: '2px' }}>
                              <AnimatedNumber
                                includeComma={true}
                                animateToNumber={db_data[2][0].money_earned}
                                fontStyle={{ fontSize: 40, fontWeight: 600 }}
                                configs={[{ mass: 1, tension: 260, friction: 70 }]}
                              />
                            </div>
                          </div>
                          <div style={{ fontSize: 18 }}>
                            Previous Year: PKR {db_data[2][1].money_earned}
                          </div>
                        </div>
                      </CCol>
                    </>
                  ) : (
                    <>
                      <CCol xs={4} style={loadingStyle}>
                        <CSpinner />
                      </CCol>
                      <CCol xs={4} style={loadingStyle}>
                        <CSpinner />
                      </CCol>
                      <CCol xs={4} style={loadingStyle}>
                        <CSpinner />
                      </CCol>
                    </>
                  )}
                </div>
                <h3>Recent Orders</h3>
                <div
                  style={{
                    border: '1px solid grey',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  {stat ? (
                    <ListGroup value={db_data[3]} />
                  ) : (
                    <>
                      <CPlaceholder component="p" animation="wave">
                        <CPlaceholder xs={11} size="lg" />
                        <CPlaceholder xs={10} size="lg" />
                        <CPlaceholder xs={9} size="lg" />
                        <CPlaceholder xs={8} size="lg" />
                        <CPlaceholder xs={8} size="lg" />
                        <CPlaceholder xs={7} size="lg" />
                        <CPlaceholder xs={7} size="lg" />
                        <CPlaceholder xs={6} size="lg" />
                      </CPlaceholder>
                    </>
                  )}
                </div>
              </CCol>
              <CCol xl={5} style={{ padding: '5px' }}>
                <h3>Order Complains</h3>
                <div
                  style={{
                    border: '2px solid grey',
                    borderRadius: '12px',
                    padding: '2px',
                    backgroundColor: '#d9d9d9',
                  }}
                >
                  {stat ? (
                    <Table value={db_data[4]} />
                  ) : (
                    <>
                      <CPlaceholder component="p" animation="glow">
                        <CPlaceholder xs={11} size="lg" />
                        <CPlaceholder xs={10} size="lg" />
                        <CPlaceholder xs={9} size="lg" />
                        <CPlaceholder xs={9} size="lg" />
                        <CPlaceholder xs={8} size="lg" />
                        <CPlaceholder xs={8} size="lg" />
                        <CPlaceholder xs={7} size="lg" />
                        <CPlaceholder xs={7} size="lg" />
                        <CPlaceholder xs={6} size="lg" />
                      </CPlaceholder>
                    </>
                  )}
                </div>
                <h3>Insights</h3>
                <div
                  style={{
                    border: '2px solid grey',
                    borderRadius: '10px',
                    backgroundColor: '#d9d9d9',
                  }}
                >
                  {stat ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CCol xs={6}>
                          <StatWidgetB text="Current Employees" value={db_data[5]} />
                        </CCol>
                        <CCol xs={6}>
                          <StatWidgetB text="Total Sales" value={db_data[7]} />
                        </CCol>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CCol xs={6}>
                          <StatWidgetA
                            text="Daily Profit"
                            value={db_data[6][0]}
                            text1="Yesterday profit"
                            value1={db_data[6][1]}
                            text2="Last 10 days sales"
                            value2={db_data[6][2]}
                          />
                        </CCol>
                        <CCol xs={6}>
                          <StatWidgetE />
                        </CCol>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CCol xs={6} style={loadingStyle1}>
                          <CSpinner />
                        </CCol>
                        <CCol xs={6} style={loadingStyle1}>
                          <CSpinner />
                        </CCol>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CCol xs={6} style={loadingStyle1}>
                          <CSpinner />
                        </CCol>
                        <CCol xs={6} style={loadingStyle1}>
                          <CSpinner />
                        </CCol>
                      </div>
                    </>
                  )}
                </div>
              </CCol>
            </CRow>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default Dashboard
