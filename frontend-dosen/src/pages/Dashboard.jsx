import React, { useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { Navigate } from "react-router-dom"
import { FaRegClipboard, FaRegFile } from 'react-icons/fa'

const Dashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { isError, user } = useSelector((state) => state.auth)

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Dashboard</h3>
                </div>
                <Row>
                    <Col lg="6 mb-2 p-1">
                        <Card className='shadow rounded-3 text-white bg-primary'>
                            <Card.Body className='p-4'>
                                <h3 className='mb-2'>Hai, Selamat datang!</h3>
                                <Card.Text className='fs-6'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati illum hic quis, quos neque laborum nemo sint impedit accusantium.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" className='mb-2  p-1'>
                        <Card className='shadow-sm bg-success'>
                            <Card.Body>
                                <FaRegFile className='h1 float-end opacity-50' />
                                <h6 className="text-white text-uppercase mt-0">IPS</h6>
                                <h2 className='fw-bold text-white'>1,587</h2>
                                <span className="text-white">Indeks Prestasi Semester</span>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" className='mb-2  p-1'>
                        <Card className='shadow-sm bg-success'>
                            <Card.Body>
                                <FaRegFile className='h1 float-end opacity-50' />
                                <h6 className="text-white text-uppercase mt-0">IPK</h6>
                                <h2 className='fw-bold text-white'>1,587</h2>
                                <span className="text-white">Indeks Prestasi Kumulatif</span>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col lg="9" className='p-1'>
                        <Card className='shadow-sm'>
                            <Card.Header>Jadwal Kuliah minggu ini</Card.Header>
                            <Card.Body className='p-3'>
                                <div className="table-responsive mt-1">
                                    <Table striped>
                                        <thead>
                                            <tr style={{ background: '#C5E1D4' }}>
                                                <th className='fw-bold py-3'>#</th>
                                                <th className='fw-bold py-3'>Mata Kuliah</th>
                                                <th className='fw-bold py-3'>SKS</th>
                                                <th className='fw-bold py-3'>Status MK</th>
                                                <th className='fw-bold py-3'>Paket</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='border'>
                                                <th scope='row' className='py-2'>1</th>
                                                <td className='py-2'>Mark</td>
                                                <td className='py-2'>Otto</td>
                                                <td className='py-2'>@mdo</td>
                                                <td className='py-2'><span className="badge rounded-pill text-bg-success">Paket</span></td>
                                            </tr>
                                            <tr className='border'>
                                                <th scope='row' className='py-2'>2</th>
                                                <td className='py-2'>Jacob</td>
                                                <td className='py-2'>Thornton</td>
                                                <td className='py-2'>@fat</td>
                                                <td className='py-2'><span className="badge rounded-pill text-bg-success">Paket</span></td>
                                            </tr>
                                            <tr className='border'>
                                                <th scope='row' className='py-2'>3</th>
                                                <td className='py-2'>Larry the Bird</td>
                                                <td className='py-2'>Larry the Bird</td>
                                                <td className='py-2'>Larry the Bird</td>
                                                <td className='py-2'><span className="badge rounded-pill text-bg-success">Paket</span></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" className='p-1'>
                        <Row>
                            <Col lg="12">
                                <Card className='shadow-sm'>
                                    <Card.Body></Card.Body>
                                </Card>
                            </Col>
                            <Col lg="12" className='mt-4'>
                                <Card className='shadow-sm'>
                                    <Card.Body></Card.Body>
                                </Card>
                            </Col>
                            <Col lg="12" className='mt-4'>
                                <Card className='shadow-sm'>
                                    <Card.Body></Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>}

        </Layout>
    )
}

export default Dashboard