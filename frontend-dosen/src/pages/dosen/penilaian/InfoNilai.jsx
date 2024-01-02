import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/watch.svg"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { LuFileInput } from "react-icons/lu"
import { FaEdit, FaPencilAlt, FaReply } from 'react-icons/fa'

const InfoNilai = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const [detailKls, setDetailKls] = useState([])
    const [Nilai, setNilai] = useState([])
    const [nilaiFixed, setNilaiFixed] = useState([])

    useEffect(() => {
        getKelasById()
        console.log(location.state)
        getNilaiMahasiswa()
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getNilaiFixed()
    }, [Nilai])

    const getKelasById = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idKelas}`)
            setDetailKls(response.data.data)
        } catch (error) {

        }
    }

    const getNilaiMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${location.state.kodeMk}&codeKls=${location.state.kodeKls}&codeThnAjr=${location.state.kodeThn}`)
            setNilai(response.data.data)
        } catch (error) {
        }
    }

    const getNilaiFixed = () => {
        if (Nilai.length != 0) {
            const i = Nilai.map(el => {
                let fix = parseFloat(el.nilai_akhir)
                return fix.toFixed(2)
            })
            setNilaiFixed(i)
        }
    }

    return (
        <Layout>
            <title>Penilaian</title>
            {isError ? <Navigate to="/login" />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h2 className='fs-4 font-bold'>Penilaian</h2>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body className='py-3'>
                                    <Row className='bg-[#E9EAE1] py-3 px-3 shadow-sm rounded'>
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
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Kode MK</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].code_mata_kuliah : ""}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card className='mt-3'>
                                <Card.Body className='py-3'>
                                    {Nilai.length > 0 ?
                                        <Row>
                                            <Col className='p-0'>
                                                <div className="table-responsive">
                                                    <Table hover>
                                                        <thead>
                                                            <tr className='border'>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>#</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>NIM</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Nama</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Presentasi</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Materi</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Power Point</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Keaktifan</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Tugas</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>UTS</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>UAS</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Absen</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Jumlah</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Nilai</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Grade</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Status</span></th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}><span className='text-[11px]'>Aksi</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Nilai.map((item, index) => (
                                                                <tr key={index} className='border'>
                                                                    <th scope='row' className='py-2 border text-center'><span className='text-[11px]'>{index + 1}</span></th>
                                                                    <td className='py-2 border text-capitalize' align='center'><span className='text-[11px]'>{item.mahasiswas[0].nim}</span></td>
                                                                    <td className='py-2 border text-capitalize'><span className='text-[11px]'>{item.mahasiswas[0].nama}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_presentasi}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_penguasaan_materi}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_slide_power_point}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_keaktifan}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_tugas}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_uts}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_uas}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_hadir}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_jumlah}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{nilaiFixed[index]}</span></td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.kategoriNilais[0].nilai_huruf}</span></td>
                                                                    <td className='py-2 border text-capitalize' align='center'>
                                                                        {item.kategoriNilais[0].keterangan == 'LULUS' ?
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-bold leading-none text-white text-[11px]">{item.kategoriNilais[0].keterangan}</span>
                                                                            :
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-bold leading-none text-white text-[11px]">{item.kategoriNilais[0].keterangan}</span>
                                                                        }
                                                                    </td>
                                                                    <td className='py-2 border px-1 text-capitalize' align='center'>
                                                                        <Link to={'/editnilai'} state={{
                                                                            idNilai: item.id_nilai_kuliah,
                                                                            kodeMk: location.state.kodeMk,
                                                                            idKelas: location.state.idKelas,
                                                                            kodeKls: location.state.kodeKls,
                                                                            kodeThn: location.state.kodeThn,
                                                                            kodeSmt: location.state.kodeSmt,
                                                                            kodeJen: location.state.kodeJen,
                                                                            kodeFk: location.state.kodeFk,
                                                                            kodeProd: location.state.kodeProd
                                                                        }} className='bg-[#28A745] py-2 px-2 rounded-full text-white inline-flex items-center'><FaPencilAlt /></Link>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                        :
                                        <Row className='mt-5'>
                                            <Col className='flex justify-center'>
                                                <div>
                                                    <div className='flex justify-center'>
                                                        <Image src={dataBlank} width={150} />
                                                    </div>
                                                    <p className='text-muted font-bold'>Anda belum melakukan input nilai</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <Link to='/penilaian' state={{ kodeThn: location.state.kodeThn, kodeSmt: location.state.kodeSmt, kodeJen: location.state.kodeJen, kodeFk: location.state.kodeFk, kodeProd: location.state.kodeProd }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center no-underline'><FaReply /> &nbsp; <span>Kembali</span></Link>
                                            {Nilai.length > 0 ?
                                                ""
                                                // <Link to='/editnilai' state={{ kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls, kodeThn: detailKls.code_tahun_ajaran }} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center no-underline float-right'><LuFileInput /> &nbsp; <span>Edit Nilai</span></Link>
                                                : <Link to='/inputnilai' state={{
                                                    idKelas: location.state.idKelas,
                                                    kodeMk: location.state.kodeMk,
                                                    kodeKls: location.state.kodeKls,
                                                    kodeThn: location.state.kodeThn,
                                                    kodeSmt: location.state.kodeSmt,
                                                    kodeJen: location.state.kodeJen,
                                                    kodeFk: location.state.kodeFk,
                                                    kodeProd: location.state.kodeProd
                                                }} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center float-right no-underline'><LuFileInput /> &nbsp; <span>Input Nilai</span></Link>
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