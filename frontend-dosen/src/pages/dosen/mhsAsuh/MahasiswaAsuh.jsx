import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import Swal from 'sweetalert2'

const MahasiswaAsuh = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [tahunAngkatan, setTahunAngkatan] = useState("")
    const [username, setUsername] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getYearNow()
    }, [])

    useEffect(() => {
        getUserDosen()
    }, [user])

    useEffect(() => {
        getMhsAsuh()
    }, [kodeJenjang, kodeFakultas, kodeProdi, username, tahunAngkatan])

    const getYearSelected = (e) => {
        setTahunAngkatan(e)
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = 2021; tahun <= year; tahun++) {
        th.push(
            <li className="nav-item" key={tahun}>
                <span className={`border cursor-pointer ${tahun == tahunAngkatan ? '' : 'text-dark'} nav-link ${tahun == tahunAngkatan ? 'active' : ''}`} onClick={() => getYearSelected(tahun)} aria-current="page">{tahun}</span>
            </li>
        )
    }

    const getYearNow = () => {
        const d = new Date()
        let year = d.getFullYear()
        setTahunAngkatan(year)
    }

    const getUserDosen = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/pembimbingAkademik/verifikasiDosenPembimbing/${user.data.username}`)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeProdi(response.data.data.code_prodi)
            }
        } catch (error) {

        }
    }

    const getMhsAsuh = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && username) {
                const response = await axios.get(`v1/pembimbingAkademik/mahasiswaByDosenPembimbing/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}/${tahunAngkatan}`)
                setIdentitas(response.data.identitas)
                console.log(response.data.identitas)
                setMahasiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Mahasiswa Asuh</title>
            {isError ? <Navigate to="/login" />
                :
                <>
                    {load ?
                        <div className='h-100 absolute z-50 left-0 right-0 top-0 w-full bg-[#E9EAE1] flex justify-center items-center' style={{ height: '100%' }}>
                            <div className=''>
                                <Circles
                                    height="80"
                                    width="80"
                                    color="#000"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        </div>
                        :
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Mahasiswa Asuh</h2>
                            </div>
                            <div>
                                <Row>
                                    <Col>
                                        <Card className='shadow'>
                                            <Card.Body className='py-3'>
                                                <Row className='bg-[#E9EAE1] p-3 shadow-sm rounded'>
                                                    <Col lg="6" sm="12">
                                                        <Row className='mb-2'>
                                                            <Col lg="3" md="3" sm="5" xs="5">
                                                                <Card.Text className='fw-bold text-uppercase'>nipy</Card.Text>
                                                            </Col>
                                                            <Col lg="1" md="1" sm="1" xs="1">
                                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                            </Col>
                                                            <Col lg="8">
                                                                <Card.Text className='fw-bold text-uppercase'>{identitas.nip_ynaa}</Card.Text>
                                                            </Col>
                                                        </Row>
                                                        <Row className='mb-2'>
                                                            <Col lg="3" md="3" sm="5" xs="5">
                                                                <Card.Text className='fw-bold text-uppercase'>pembimbing</Card.Text>
                                                            </Col>
                                                            <Col lg="1" md="1" sm="1" xs="1">
                                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                            </Col>
                                                            <Col lg="8">
                                                                <Card.Text className='fw-bold text-uppercase'>{identitas.nama}</Card.Text>
                                                            </Col>
                                                        </Row>
                                                        <Row className=''>
                                                            <Col lg="3" md="3" sm="5" xs="5">
                                                                <Card.Text className='fw-bold text-uppercase'>kuota</Card.Text>
                                                            </Col>
                                                            <Col lg="1" md="1" sm="1" xs="1">
                                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                            </Col>
                                                            <Col lg="8">
                                                                <Card.Text className='fw-bold text-uppercase'>{identitas.kouta_bimbingan} orang</Card.Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg="6" sm="12">
                                                        <Row className='mb-2'>
                                                            <Col lg="3" md="3" sm="5" xs="5">
                                                                <Card.Text className='fw-bold text-uppercase'>jenjang</Card.Text>
                                                            </Col>
                                                            <Col lg="1" md="1" sm="1" xs="1">
                                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                            </Col>
                                                            <Col lg="8">
                                                                <Card.Text className='fw-bold text-uppercase'>{identitas.jenjang_pendidikan}</Card.Text>
                                                            </Col>
                                                        </Row>
                                                        <Row className='mb-2'>
                                                            <Col lg="3" md="3" sm="5" xs="5">
                                                                <Card.Text className='fw-bold text-uppercase'>fakultas</Card.Text>
                                                            </Col>
                                                            <Col lg="1" md="1" sm="1" xs="1">
                                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                            </Col>
                                                            <Col lg="8">
                                                                <Card.Text className='fw-bold text-uppercase'>{identitas.fakultas}</Card.Text>
                                                            </Col>
                                                        </Row>
                                                        <Row className='mb-2'>
                                                            <Col lg="3" md="3" sm="5" xs="5">
                                                                <Card.Text className='fw-bold text-uppercase'>prodi</Card.Text>
                                                            </Col>
                                                            <Col lg="1" md="1" sm="1" xs="1">
                                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                            </Col>
                                                            <Col lg="8">
                                                                <Card.Text className='fw-bold text-uppercase'>{identitas.prodi}</Card.Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Card className='shadow-md mt-3'>
                                            <Card.Body className='p-3'>
                                                <Row className='mb-2'>
                                                    <Col>
                                                        <ul className="nav nav-pills nav-fill">
                                                            {th}
                                                        </ul>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Row className='mt-1'>
                                                            <Col>
                                                                <div className='table-responsive' >
                                                                    <Table hover>
                                                                        <thead>
                                                                            <tr className='border'>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span>NIM</span></th>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Nama</th>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenjang</th>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Fakultas</th>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Prodi</th>
                                                                                <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {Mahasiswa.length > 0 ? Mahasiswa.map((item, index) => (
                                                                                <tr className='border' key={item.id_detail_pembimbing_akademik}>
                                                                                    <td className='py-3'>{index + 1}</td>
                                                                                    <td className='py-3 text-capitalize'>{item.nim}</td>
                                                                                    <td className='py-3 text-capitalize'>{item.mahasiswas[0].nama}</td>
                                                                                    <td className='py-3 text-capitalize'>{identitas.jenjang_pendidikan}</td>
                                                                                    <td className='py-3 text-capitalize'>{identitas.fakultas}</td>
                                                                                    <td className='py-3 text-capitalize'>{identitas.prodi}</td>
                                                                                    <td className='py-3 text-capitalize'>{item.status == 'aktif' ? <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Aktif</span> : <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Tidak Aktif</span>}</td>
                                                                                </tr>
                                                                            )) :
                                                                                <tr className='border'>
                                                                                    <td className='py-2' colSpan={7} align='center'>
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
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default MahasiswaAsuh