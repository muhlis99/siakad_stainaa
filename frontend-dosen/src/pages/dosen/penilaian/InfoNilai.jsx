import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { LuFileInput } from "react-icons/lu"
import { FaReply } from 'react-icons/fa'

const InfoNilai = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const [detailKls, setDetailKls] = useState([])
    const [Nilai, setNilai] = useState([])

    useEffect(() => {
        getKelasById()
        // console.log(location.state)
        getNilaiMahasiswa()
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const getKelasById = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idKelas}`)
            setDetailKls(response.data.data)
        } catch (error) {

        }
    }

    const getNilaiMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${location.state.kodeMk}&codeKls=${location.state.kodeKls}`)
            setNilai(response.data.data)
        } catch (error) {

        }

    }


    return (
        <Layout>
            {isError ? <Navigate to="/login" />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">Penilaian</h3>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row className='bg-[#E9EAE1] border-l-2 border-[#5E7C60] py-3 px-3 shadow-sm rounded-r-lg'>
                                        <Col lg="6" sm="12">
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Jenjang</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.jenjangPendidikans[0].nama_jenjang_pendidikan : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.fakultas[0].nama_fakultas : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.prodis[0].nama_prodi : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Kelas</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls.nama_kelas}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg="6" sm="12">
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.tahunAjarans[0].tahun_ajaran : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.semesters[0].semester : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Mata kuliah</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].nama_mata_kuliah : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {Nilai.length > 0 ?
                                        <Row className='mt-5'>
                                            <Col className='p-0'>
                                                <div className="table-responsive">
                                                    <Table hover>
                                                        <thead>
                                                            <tr className='border'>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>#</th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>NIM</th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>Nama</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Tugas</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>UTS</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>UAS</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Absen</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Jumlah</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Nilai</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Grade</th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Nilai.map((item, index) => (
                                                                <tr key={index} className='border'>
                                                                    <th scope='row' className='py-2 border text-center'>{index + 1}</th>
                                                                    <td className='py-2 border text-capitalize' align='center'>{item.mahasiswas[0].nim}</td>
                                                                    <td className='py-2 border text-capitalize'>{item.mahasiswas[0].nama}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.nilai_tugas}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.nilai_uts}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.nilai_uas}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.nilai_hadir}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.nilai_jumlah}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.nilai_akhir}</td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>{item.kategoriNilais[0].nilai_huruf}</td>
                                                                    <td className='py-2 border text-capitalize' align='center'>{item.kategoriNilais[0].keterangan}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                        :
                                        <Row className='mt-5'>
                                            <Col className='text-center'>
                                                <p className='text-[#DC3545]'>Anda belum melakukan input nilai</p>
                                            </Col>
                                        </Row>
                                    }
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <Link to='/penilaian' className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center no-underline'><FaReply /> &nbsp; <span>Kembali</span></Link>
                                            {Nilai.length > 0 ?
                                                <Link to='/editnilai' state={{ kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls, kodeThn: detailKls.code_tahun_ajaran }} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center no-underline float-right'><LuFileInput /> &nbsp; <span>Edit Nilai</span></Link>
                                                : <Link to='/inputnilai' state={{ kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls }} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center float-right no-underline'><LuFileInput /> &nbsp; <span>Input Nilai</span></Link>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </Layout>
    )
}

export default InfoNilai