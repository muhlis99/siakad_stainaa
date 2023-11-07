import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/noData.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'

const HistoryKrs = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [nim, setNim] = useState("")
    const [nama, setNama] = useState("")
    const [biodata, setBiodata] = useState("")
    const [riwayat, setRiwayat] = useState("")

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataTahun()
    }, [])

    useEffect(() => {
        getDataSemester()
    }, [kodeTahun])

    useEffect(() => {
        const getBiodata = async () => {
            if (user) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaNow/${user.data.username}`)
                setNama(response.data.identitas.nama)
                setNim(response.data.identitas.nim)
                setKodeTahun(response.data.data[0].code_tahun_ajaran)
                setKodeSemester(response.data.data[0].code_semester)
            }
        }
        getBiodata()
    }, [user])

    useEffect(() => {
        const getHistoryKrs = async () => {
            if (user && kodeTahun && kodeSemester) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaHistory/${user.data.username}/${kodeTahun}/${kodeSemester}`)
                setBiodata(response.data.identitas)
                setRiwayat(response.data.data)
            }
        }
        getHistoryKrs()
    }, [user, kodeTahun, kodeSemester])

    const getDataTahun = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getDataSemester = async () => {
        if (kodeTahun) {
            setKodeSemester("")
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        } else {
            setSemester([])
            setKodeSemester('')
        }
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Riwayat Kartu Rencana Studi</h3>
                </div>
                <Row>
                    <Col>
                        <Card className='shadow mb-3'>
                            <Card.Body className='justify'>
                                <Row className='mb-2 py-4 ps-3 shadow-sm rounded-end' style={{ background: '#E9EAE1', borderLeft: 'solid #5E7C60 2px' }}>
                                    <Col lg="6" sm="12">
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>nim</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{nim}</Card.Text>
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
                                                <Card.Text className='fw-bold text-uppercase'>{nama}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="6" sm="12">
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
                                <Row className='mt-4 mb-1'>
                                    <Col lg="2" className='p-1'>
                                        <select className="form-select form-select-sm mt-2" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                            <option value="">Tahun</option>
                                            {Tahun.map((item) => (
                                                <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col lg="2" className='p-1'>
                                        <select className="form-select form-select-sm mt-2" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                            <option value="">Semester</option>
                                            {Semester.map((item) => (
                                                <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                            ))}
                                        </select>
                                    </Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col className='p-1'>
                                        <div className="table-responsive">
                                            <Table hover>
                                                <thead>
                                                    <tr className='border-bottom-3'>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>#</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Kode MK</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>SKS</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Bobot MK</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Status MK</th>
                                                    </tr>
                                                </thead>
                                                {riwayat.length >= 1 ?
                                                    <tbody>
                                                        {riwayat.map((item, index) => (
                                                            <tr key={item.code_mata_kuliah} className='border'>
                                                                <th scope='row' className='py-2'>{index + 1}</th>
                                                                <td className='py-2'>{item.mataKuliahs[0].code_mata_kuliah}</td>
                                                                <td className='py-2'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                                <td className='py-2'>{item.mataKuliahs[0].sks}</td>
                                                                <td className='py-2'>{item.mataKuliahs[0].status_bobot_makul}</td>
                                                                <td className='py-2 text-capitalize'>{item.mataKuliahs[0].status_makul}</td>
                                                            </tr>
                                                        ))}
                                                        <tr className='border'>
                                                            <td colSpan={3} align='center' className='font-bold'>
                                                                Total SKS
                                                            </td>
                                                            <td colSpan={3} className='font-bold'>
                                                                {biodata.total_sks}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    :
                                                    <tbody>
                                                        <tr className='border'>
                                                            <td colSpan={6} align='center'>
                                                                <Image src={dataBlank} thumbnail width={150} />
                                                                <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                }
                                                {/* <tbody>
                                                    {riwayat.length >= 1 ? riwayat.map((item, index) => (
                                                        <tr key={item.code_mata_kuliah} className='border'>
                                                            <th scope='row' className='py-2'>{index + 1}</th>
                                                            <td className='py-2'>{item.mataKuliahs[0].code_mata_kuliah}</td>
                                                            <td className='py-2'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                            <td className='py-2'>{item.mataKuliahs[0].sks}</td>
                                                            <td className='py-2'>{item.mataKuliahs[0].status_bobot_makul}</td>
                                                            <td className='py-2 text-capitalize'>{item.mataKuliahs[0].status_makul}</td>
                                                        </tr>
                                                    )) :
                                                        <tr className='border'>
                                                            <td colSpan={6} align='center'>
                                                                <Image src={dataBlank} thumbnail width={150} />
                                                                <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody> */}
                                            </Table>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}

export default HistoryKrs