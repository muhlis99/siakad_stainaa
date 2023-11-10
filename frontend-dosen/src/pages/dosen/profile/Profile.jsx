import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'

const Profile = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [detail, setDetail] = useState([])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDosenByNip()
    }, [user])

    const getDosenByNip = async () => {
        try {
            const response = await axios.get(`v1/dosen/getByNipy/${user.data.username}`)
            setDetail(response.data.data)
        } catch (error) {

        }
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" replace /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Profil</h3>
                </div>
                <div>
                    <Row>
                        <Col lg='2'>
                            <Card>
                                <Card.Body></Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col className='p-0'>
                                            <h3>Detail Diri</h3>
                                        </Col>
                                    </Row>
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
                                    <hr />
                                    <Row>
                                        <Col className='p-0'>
                                            <h3>Detail Alamat</h3>
                                        </Col>
                                    </Row>
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
                </div>

            </div>}
        </Layout>
    )
}

export default Profile