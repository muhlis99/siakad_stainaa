import React, { useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { Navigate } from "react-router-dom"

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
                    <Col lg="6">
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <Card.Title>Hai, Selamat datang!</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati illum hic quis, quos neque laborum nemo sint impedit accusantium.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3">
                        <Card className='shadow-sm'>
                            <Card.Body></Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3">
                        <Card className='shadow-sm'>
                            <Card.Body></Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col lg="9">
                        <Card className='shadow-sm'>
                            <Card.Header>Jadwal Kuliah minggu ini</Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td colSpan={2}>Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3">
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