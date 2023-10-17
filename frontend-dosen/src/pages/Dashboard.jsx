import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { Navigate } from "react-router-dom"
import { FaGlobe, FaRegClipboard, FaRegFile } from 'react-icons/fa'
import axios from 'axios'

const Dashboard = () => {
    const [Prodi, SetProdi] = useState([])
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getTotalSKSProdi = async () => {
            try {
                const response = await axios.get(`v1/home/totalSksDanProdi/${user.data.username}`)
                SetProdi(response.data.data)
            } catch (error) {

            }
        }

        getTotalSKSProdi()
    }, [user])


    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Dashboard</h3>
                </div>
                <Row>
                    <Col lg="6 mb-2 p-1">
                        <Card className='shadow rounded-4 h-100'>
                            <Card.Body className='p-4'>
                                <h3 style={{ color: '#5E7C60' }}>Hai, Selamat datang!</h3>
                                <Card.Text className='small'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati illum hic quis, quos neque laborum nemo sint impedit accusantium.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" className='mb-2  p-1'>
                        <div className="card h-100 shadow rounded-4">
                            <div className="card-body">
                                <Row>
                                    <Col lg="12">
                                        <div className="lead mb-2">Prodi</div>
                                        <h6 className='card-title'>{Prodi.prodi}</h6>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col lg="3" className='mb-2  p-1'>
                        <div className="card h-100 shadow rounded-4">
                            <div className="card-body">
                                <div className="lead mb-2">Total SKS</div>
                                <h2 className="card-title">{Prodi.totalSks}</h2>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col lg="12" className='p-1'>
                        <Card className='shadow-sm'>
                            <Card.Header>Jadwal Kuliah Hari ini</Card.Header>
                            <Card.Body className='p-3'>
                                <div className="table-responsive mt-1">
                                    <Table striped>
                                        <thead>
                                            <tr style={{ background: '#E9EAE1' }}>
                                                <th className='fw-bold py-3'>#</th>
                                                <th className='fw-bold py-3'>Jam</th>
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
                                                <td className='py-2'>@mdo</td>
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

export default Dashboard