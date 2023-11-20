import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Image } from 'react-bootstrap'
import gambar from "../../../assets/images/noimage.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'

const Profile = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [detail, setDetail] = useState([])
    const [prevFoto, setPrevFoto] = useState("")
    const [prevQr, setPrevQr] = useState("")
    const [prevKtp, setPrevKtp] = useState("")
    const [prevSehatRoh, setPrevSehatRoh] = useState("")
    const [prevSehatJas, setPrevSehatJas] = useState("")
    const [prevPerjanjian, setPrevPerjanjian] = useState("")
    const [prevSKDosen, setPrevSKDosen] = useState("")
    const [prevSkBebasNarko, setPrevSkBebasNarko] = useState("")
    const [prevSkPt, setPrevSkPt] = useState("")
    const [prevSkPimpinan, setPrevSkPimpinan] = useState("")

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDosenByNip()
    }, [user])

    useEffect(() => {
        prevFotoDiri()
        prevQrCode()
        FotoKtp()
        sehatRohani()
        sehatJasmani()
        perjanjianKerja()
        skDosen()
        bebasNarkotika()
        skPimpinanPt()
        aktifTridmaPt()
    }, [detail])

    const getDosenByNip = async () => {
        try {
            const response = await axios.get(`v1/dosen/getByNipy/${user.data.username}`)
            setDetail(response.data.data)
        } catch (error) {

        }
    }

    const prevFotoDiri = async () => {
        try {
            if (detail.foto_diri) {
                await axios.get(`v1/dosen/public/seeImage/dosen/diri/${detail.foto_diri}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevFoto(base64)
                })
            }
        } catch (error) {

        }
    }

    const prevQrCode = async () => {
        try {
            if (detail.qrcode) {
                await axios.get(`v1/dosen/public/seeImage/dosen/qrCode/${detail.qrcode}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevQr(base64)
                })
            }
        } catch (error) {

        }
    }

    const FotoKtp = async () => {
        try {
            if (detail.foto_ktp) {
                await axios.get(`v1/dosen/public/seeImage/dosen/ktp/${detail.foto_ktp}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKtp(base64)
                })
            }
        } catch (error) {

        }
    }

    const sehatRohani = async () => {
        try {
            if (detail.foto_sehat_rohani) {
                await axios.get(`v1/dosen/public/seeImage/dosen/sehatRohani/${detail.foto_sehat_rohani}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSehatRoh(base64)
                })
            }
        } catch (error) {

        }
    }

    const sehatJasmani = async () => {
        try {
            if (detail.foto_sehat_jasmani) {
                await axios.get(`v1/dosen/public/seeImage/dosen/sehatJasmani/${detail.foto_sehat_jasmani}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSehatJas(base64)
                })
            }
        } catch (error) {

        }
    }

    const perjanjianKerja = async () => {
        try {
            if (detail.foto_surat_perjanjian_kerja) {
                await axios.get(`v1/dosen/public/seeImage/dosen/suratPerjanjianKerja/${detail.foto_surat_perjanjian_kerja}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevPerjanjian(base64)
                })
            }
        } catch (error) {

        }
    }

    const skDosen = async () => {
        try {
            if (detail.foto_sk_dosen) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skDosen/${detail.foto_sk_dosen}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSKDosen(base64)
                })
            }
        } catch (error) {

        }
    }

    const bebasNarkotika = async () => {
        try {
            if (detail.foto_sk_bebas_narkotika) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skBebasNarkotika/${detail.foto_sk_bebas_narkotika}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSkBebasNarko(base64)
                })
            }
        } catch (error) {

        }
    }

    const skPimpinanPt = async () => {
        try {
            if (detail.foto_sk_aktif_melaksanakan_tridma_pt) {
                await axios.get(`/v1/dosen/public/seeImage/dosen/skDariPimpinanPt/${detail.foto_sk_aktif_melaksanakan_tridma_pt}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSkPimpinan(base64)
                })
            }
        } catch (error) {

        }
    }

    const aktifTridmaPt = async () => {
        try {
            if (detail.foto_sk_aktif_melaksanakan_tridma_pt) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skAktifMelaksanakanTridmaPt/${detail.foto_sk_aktif_melaksanakan_tridma_pt}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSkPt(base64)
                })
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Profil</h3>
                </div>
                <div>
                    <Row>

                        <Col lg='12'>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Header className='pb-0'>
                                            <p className='font-bold text-2xl text-[#5E7C60]'>
                                                Detail Diri
                                            </p>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col lg='6'>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>nidn</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.nidn}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>nipy</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.nip_ynaa}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>nama</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.nama}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Tempat Lahir</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.tempat_lahir}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Tanggal Lahir</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{moment(detail.tanggal_lahir).format('DD MMMM YYYY')}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Jenis Kelamin</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.jenis_kelamin == 'l' ? 'laki-laki' : 'perempuan'}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg='6'>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>email</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder '>{detail.email}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>No Handphone</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.no_hp}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>No Telepon</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.no_telepon}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Pendidikan Terakhir</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.pendidikans && detail.pendidikans[0].nama_pendidikan}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Status Pegawai</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.status_kepegawaian == 'non_pns' ? 'Non PNS' : 'PNS'}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Tahun Masuk</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{moment(detail.tanggal_mulai).format('DD MMMM YYYY')}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Header className='pb-0'>
                                            <p className='font-bold text-2xl text-[#5E7C60]'>
                                                Detail Alamat
                                            </p>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row>
                                                <Col lg='6'>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Alamat</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.alamat_lengkap}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>desa</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.desas && detail.desas[0].nama_desa}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>kecamatan</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.kecamatans && detail.kecamatans[0].nama_kecamatan}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>kabupaten</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.kabupatens && detail.kabupatens[0].nama_kabupaten}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg='6'>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>provinsi</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.provinsis && detail.provinsis[0].nama_provinsi}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>negara</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.negaras && detail.negaras[0].nama_negara}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Kode Pos</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.kode_pos}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Alat Transportasi</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.alat_transportasis && detail.alat_transportasis[0].nama_alat_transportasi}</span></Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevFoto ? <Image src={`data:;base64,${prevFoto}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevQr ? <Image src={`data:;base64,${prevQr}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevKtp ? <Image src={`data:;base64,${prevKtp}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevSehatRoh ? <Image src={`data:;base64,${prevSehatRoh}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevSehatJas ? <Image src={`data:;base64,${prevSehatJas}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevPerjanjian ? <Image src={`data:;base64,${prevPerjanjian}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevSKDosen ? <Image src={`data:;base64,${prevSKDosen}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevSkBebasNarko ? <Image src={`data:;base64,${prevSkBebasNarko}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevSkPimpinan ? <Image src={`data:;base64,${prevSkPimpinan}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col lg='2' sm='12' className='mb-2'>
                                    <Card className='shadow'>
                                        <Card.Body className='p-0'>
                                            {prevSkPt ? <Image src={`data:;base64,${prevSkPt}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

            </div>}
        </Layout>
    )
}

export default Profile