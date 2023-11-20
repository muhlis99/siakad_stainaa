import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'

const MahasiswaAsuh = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [username, setUsername] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getJenjangPendidikan()
        getFakultas()
        getProdi()
    }, [kodeJenjang, kodeFakultas])

    useEffect(() => {
        getMhsAsuh()
    }, [kodeJenjang, kodeFakultas, kodeProdi, username])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getFakultas = async () => {
        try {
            if (kodeJenjang != 0) {
                const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
                setFakultas(response.data.data)
            } else {
                setKodeFakultas()
            }
        } catch (error) {

        }
    }

    const getProdi = async () => {
        try {
            if (kodeFakultas != 0) {
                const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
                setProdi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getMhsAsuh = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && username) {
                const response = await axios.get(`v1/pembimbingAkademik/mahasiswaByDosenPembimbing/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}`)
                setIdentitas(response.data.identitas)
                setMahasiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">Mahasiswa Asuh</h3>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <Card className='shadow'>
                                    <Card.Body className='p-4'>
                                        <Row>
                                            <Col lg='4'>
                                                <select className="form-select" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                                    <option value="">Jenjang Pendidikan</option>
                                                    {Jenjang.map((item) => (
                                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg='4'>
                                                <select className="form-select" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                                    <option value="">Fakultas</option>
                                                    {Fakultas.map((item) => (
                                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg='4'>
                                                <select className="form-select" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                                    <option value="">Prodi</option>
                                                    {Prodi.map((item) => (
                                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row className='mt-5'>
                                            {kodeJenjang && kodeFakultas && kodeProdi ?
                                                <Col className='px-3'>
                                                    <>
                                                        <Row className='bg-[#E9EAE1] border-l-2 border-[#5E7C60] py-3 px-3 shadow-sm rounded-r-lg'>
                                                            <Col lg="6" sm="12">
                                                                <Row className='mb-2'>
                                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                                        <Card.Text className='fw-bold text-uppercase'>nipy</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                        <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0'>
                                                                        <Card.Text className='fw-bold text-uppercase'>{identitas.nip_ynaa}</Card.Text>
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
                                                                        <Card.Text className='fw-bold text-uppercase'>{identitas.nama}</Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mb-2'>
                                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                                        <Card.Text className='fw-bold text-uppercase'>kuota</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                        <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0'>
                                                                        <Card.Text className='fw-bold text-uppercase'>{identitas.kouta_bimbingan} orang</Card.Text>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col lg="6" sm="12">
                                                                <Row className='mb-2'>
                                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                                        <Card.Text className='fw-bold text-uppercase'>jenjang</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                        <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0'>
                                                                        <Card.Text className='fw-bold text-uppercase'>{identitas.jenjang_pendidikan}</Card.Text>
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
                                                                        <Card.Text className='fw-bold text-uppercase'>{identitas.fakultas}</Card.Text>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mb-2'>
                                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                                        <Card.Text className='fw-bold text-uppercase'>prodi</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                        <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                                    </Col>
                                                                    <Col className='p-0'>
                                                                        <Card.Text className='fw-bold text-uppercase'>{identitas.prodi}</Card.Text>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row className='mt-5'>
                                                            <Col className='p-0'>
                                                                <div className='table-responsive' >
                                                                    <Table hover>
                                                                        <thead>
                                                                            <tr className='border'>
                                                                                <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>#</th>
                                                                                <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}><span>NIM</span></th>
                                                                                <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>Nama</th>
                                                                                <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>Prodi</th>
                                                                                <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {Mahasiswa.length > 0 ? Mahasiswa.map((item, index) => (
                                                                                <tr className='border' key={item.id_detail_pembimbing_akademik}>
                                                                                    <th scope='row' className='py-2'>{index + 1}</th>
                                                                                    <td className='py-2 text-capitalize'>{item.nim}</td>
                                                                                    <td className='py-2 text-capitalize'>{item.mahasiswas[0].nama}</td>
                                                                                    <td className='py-2 text-capitalize'>{identitas.prodi}</td>
                                                                                    <td className='py-2 text-capitalize'>{item.status == 'aktif' ? <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Aktif</span> : <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Tidak Aktif</span>}</td>
                                                                                </tr>
                                                                            )) :
                                                                                <tr className='border'>
                                                                                    <td className='py-2' colSpan={5} align='center'>
                                                                                        <Image src={dataBlank} thumbnail width={150} />
                                                                                        <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                                    </td>
                                                                                </tr>
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                </Col>
                                                : ""}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default MahasiswaAsuh