import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"

const KRS = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { isError, user } = useSelector((state) => state.auth)

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Kartu Rencana Studi</h3>
                </div>
                <Row>
                    <Col>
                        <Card className='shadow mb-4'>
                            <Card.Body className='justify'>
                                <Row>
                                    <Col className=''>
                                        <Row className='mb-2'>
                                            <Col lg="3" md="3" sm="3" xs="3">
                                                <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                            </Col>
                                            <Col lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text className='fw-bold text-uppercase'>Semester 4</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col lg="3" md="3" sm="3" xs="3">
                                                <Card.Text className='fw-bold text-uppercase'>Batas SKS</Card.Text>
                                            </Col>
                                            <Col lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text className='fw-bold text-uppercase'>24 SKS</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className=''>
                                        <Row className='mb-2'>
                                            <Col lg="3" md="3" sm="3" xs="3">
                                                <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                            </Col>
                                            <Col lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text className='fw-bold text-uppercase'>2023/2024 (Ganjil)</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col lg="3" md="3" sm="3" xs="3">
                                                <Card.Text className='fw-bold text-uppercase'>Kelas</Card.Text>
                                            </Col>
                                            <Col lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text className='fw-bold text-uppercase'>Kelas B</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className='shadow rounded'>
                            <Card.Body>
                                <div className="table-responsive">
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
                </Row>
            </div>}
        </Layout>
    )
}

export default KRS