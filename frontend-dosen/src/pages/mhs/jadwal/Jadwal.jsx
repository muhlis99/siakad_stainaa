import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/noData.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'

const Jadwal = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [Jadwal, setJadwal] = useState([])
    const [biodata, setBiodata] = useState([])
    const [dataJadwal, setDataJadwal] = useState([])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getDataJadwal = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/jadwalKuliah/getJadwalMahasiswa/${user.data.username}`)
                    setBiodata(response.data.identitas)
                    setDataJadwal(response.data.data)
                }
            } catch (error) {

            }
        }
        getDataJadwal()
    }, [user])


    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Jadwal Kuliah</h3>
                </div>
                <Row>
                    <Col>
                        <Card className='shadow mb-4 rounded-3'>
                            <Card.Body className='justify'>
                                <Row className='mb-5 py-4 ps-3 shadow-sm rounded-end-3' style={{ background: '#E9EAE1', borderLeft: 'solid #5E7C60 2px' }}>
                                    <Col lg="6" sm="12">
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>nim</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.nim}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>nama</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.nama}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>fakultas</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.fakultas}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="6" sm="12">
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.prodi}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.tahun_ajaran}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>Semester {biodata.semester}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Table hover>
                                        <thead>
                                            <tr className='border-bottom-3'>
                                                <th colSpan={8} className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Jadwal Kuliah Mingguan</th>
                                            </tr>
                                            <tr className='border-bottom-3'>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>#</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Hari</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Tanggal</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Jam</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Jenis Pertemuan</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Pembelajaran</th>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Ruang</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataJadwal.length >= 1 ? dataJadwal.map((item, index) => (
                                                <tr key={item.id_jadwal_pertemuan} className='border'>
                                                    <th scope='row' className='py-2 text-center'>{index + 1}</th>
                                                    <td className='py-2 text-capitalize' align='center'>{item.jadwalKuliahs[0].hari}</td>
                                                    <td className='py-2' align='center'>{item.tanggal_pertemuan}</td>
                                                    <td className='py-2' align='center'>{item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai}</td>
                                                    <td className='py-2' align='center'>{item.jadwalKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                    <td className='py-2 text-capitalize' align='center'>{item.jenis_pertemuan}</td>
                                                    <td className='py-2 text-capitalize' align='center'>{item.metode_pembelajaran}</td>
                                                    <td className='py-2 text-capitalize' align='center'>{item.jadwalKuliahs[0].ruangs[0].nama_ruang}</td>
                                                </tr>
                                            )) :
                                                <tr className='border'>
                                                    <td colSpan={8} align='center'>
                                                        <Image src={dataBlank} thumbnail width={150} />
                                                        <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </Table>
                                </Row>
                            </Card.Body>
                        </Card>
                        {/* <Card className='shadow rounded'>
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
                        </Card> */}
                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}

export default Jadwal