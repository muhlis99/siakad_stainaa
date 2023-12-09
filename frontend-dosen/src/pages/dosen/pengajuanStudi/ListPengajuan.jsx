import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Modal, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { FaPrint, FaSearch } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa6"
import moment from 'moment'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const ListPengajuan = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [Pengajuan, setPengajuan] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [tahunAngkatan, setTahunAngkatan] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [username, setUsername] = useState("")
    const [show, setShow] = useState(false)
    const [detail, setDetail] = useState([])
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
        getUserDosen()
    }, [user])

    useEffect(() => {
        getYearNow()
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getMhsAsuh()
    }, [kodeJenjang, kodeFakultas, kodeProdi, username, tahunAngkatan])

    useEffect(() => {
        getDataPengajuan()
    }, [kodeJenjang, kodeFakultas, kodeProdi, username])

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

    const getYearNow = () => {
        const d = new Date()
        let year = d.getFullYear()
        setTahunAngkatan(year)
    }

    const getDataPengajuan = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi) {
                const response = await axios.get(`v1/pengajuanStudi/pengajuanStudiByPemdik/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}`)
                setPengajuan(response.data.data)
            }

        } catch (error) {

        }
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = async (e) => {
        const response = await axios.get(`v1/pengajuanStudi/getById/${e}`)
        setDetail(response.data.data)
        setShow(true)
    }

    const getMhsAsuh = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && username) {
                const response = await axios.get(`v1/pembimbingAkademik/mahasiswaByDosenPembimbing/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}/${tahunAngkatan}`)
                setIdentitas(response.data.identitas)
            }
        } catch (error) {

        }
    }

    const simpanPersetujuan = (e) => {
        Swal.fire({
            title: "Anda Yakin Untuk Menyetujui?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Setujui',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoad(true)
                try {
                    axios.put(
                        `v1/pengajuanStudi/approveDosen/${e}`
                    ).then(function (response) {
                        setShow(false)
                        setLoad(false)
                        Swal.fire({
                            title: "Pengajuan Studi Berhasil Disetujui",
                            icon: "success"
                        }).then(() => {
                            getDataPengajuan()
                            setShow(false)
                        })
                    })
                } catch (error) {

                }
            }
        })
    }

    return (
        <Layout>
            <title>Riwayat Studi Mahasiswa</title>
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
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                centered
                            >
                                <Modal.Header closeButton></Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>NIM</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.nim}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Nama</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.length != 0 ? detail.mahasiswas[0].nama : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Jenjang</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.length != 0 ? detail.jenjangPendidikans[0].nama_jenjang_pendidikan : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.length != 0 ? detail.fakultas[0].nama_fakultas : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.length != 0 ? detail.prodis[0].nama_prodi : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.length != 0 ? detail.tahunAjarans[0].tahun_ajaran : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.length != 0 ? detail.semesters[0].semester : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Pengajuan</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.pengajuan}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>alasan</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.alasan}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>tanggal pengajuan</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{moment(detail.tanggal_pengajuan).format('DD MMMM YYYY')}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2 px-3'>
                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Status pengajuan</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detail.status == 'proses' ? 'Belum disetujui' : detail.status == 'disetujui1' ? 'Disetujui Dosen wali' : detail.status == 'disetujui2' ? 'disetuji oleh bauak' : ''}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                                {detail.status == 'proses' ?
                                    <Modal.Footer>
                                        <button className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center mt-2' onClick={() => simpanPersetujuan(detail.id_pengajuan_studi)}><FaCheck /> &nbsp; <span>Setujui</span></button>
                                    </Modal.Footer>
                                    : ""}
                            </Modal>

                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Pengajuan Studi</h2>
                            </div>
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
                                    <Card className="mt-3 shadow">
                                        <Card.Body className="p-3">
                                            <Row>
                                                <Col>
                                                    <div className="table-responsive">
                                                        <Table hover>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Nama</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Semester</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Pengajuan</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tanggal Pengajuan</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Pengajuan.length > 0 ? Pengajuan.map((item, index) => (
                                                                    <tr key={item.id_pengajuan_studi} className='border'>
                                                                        <td className='py-2'>{index + 1}</td>
                                                                        <td className='py-2'>{item.mahasiswas[0].nama}</td>
                                                                        <td className='py-2'>Semester {item.semesters[0].semester}</td>
                                                                        <td className='py-2 text-capitalize'>{item.pengajuan}</td>
                                                                        <td className='py-2'>{moment(item.tanggal_pengajuan).format('DD MMMM YYYY')}</td>
                                                                        <td className='py-2'>
                                                                            {item.status == 'proses' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum Disetujui</span>
                                                                                : item.status == 'disetujui1' ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Disetujui Dosen Wali</span>
                                                                                    : ""
                                                                            }
                                                                        </td>
                                                                        <td className='py-2'>
                                                                            <button onClick={() => handleShow(item.id_pengajuan_studi)} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex items-center'><FaSearch /></button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                                    :
                                                                    <tr className="border">
                                                                        <td className='py-2' colSpan={8} align='center'>
                                                                            <Image src={dataBlank} thumbnail width={150} />
                                                                            <p className='fw-bold text-muted'>Data Pengajuan Kosong</p>
                                                                        </td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default ListPengajuan