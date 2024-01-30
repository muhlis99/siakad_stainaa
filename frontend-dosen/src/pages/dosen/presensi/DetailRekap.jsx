import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image, Modal } from 'react-bootstrap'
import dataBlank from "../../../assets/images/watch.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Circles } from 'react-loader-spinner'
import { FaCheck, FaInfo, FaReply } from 'react-icons/fa'
import moment from "moment"

const DetailRekap = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [detail, setDetail] = useState([])
    const [totalMasuk, setTotalMasuk] = useState("")
    const [totalIzin, setTotalIzin] = useState("")
    const [totalSakit, setTotalSakit] = useState("")
    const [totalAlpha, setTotalAlpha] = useState("")
    const [mahasiswa, setMahasiswa] = useState("")

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        console.log(location.state)
        getRekapByNim()
        getMhsByNim()
    }, [location])

    const getRekapByNim = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/detailRekapPresensi/${location.state.nim}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
            setDetail(response.data.data)
            setTotalMasuk(response.data.datas[0].total_masuk)
            setTotalIzin(response.data.datas[0].total_izin)
            setTotalSakit(response.data.datas[0].total_sakit)
            setTotalAlpha(response.data.datas[0].total_alpha)
        } catch (error) {

        }
    }

    const getMhsByNim = async () => {
        try {
            const response = await axios.get(`v1/mahasiswa/getByNim/${location.state.nim}`)
            setMahasiswa(response.data.data.nama)
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Presensi</title>
            {isError ? <Navigate to="/login" /> :
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
                                <h2 className='fs-4 font-bold'>Rekap Presensi</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='mb-3 shadow'>
                                        <Card.Body className='py-3'>
                                            <Row className='shadow-sm py-3 rounded' style={{ background: '#E9EAE1' }}>
                                                <Col lg="7">
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>NIM</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.nim}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Nama</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{mahasiswa}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="5">
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Matakuliah</a>
                                                        </Col>
                                                        <Col className='flex gap-2 capitalize'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.mataKuliah}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Kode MK</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.kodeMk}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card className='shadow'>
                                        <Card.Body className='p-3'>
                                            <Row className='mb-2'>
                                                <Col>
                                                    <Link to='/presensi/rekap' state={{
                                                        kodeThn: location.state.kodeThn,
                                                        kodeSmt: location.state.kodeSmt,
                                                        kodeJen: location.state.kodeJen,
                                                        kodeFkl: location.state.kodeFkl,
                                                        kodePro: location.state.kodePro,
                                                        idProdi: location.state.idProdi,
                                                        kodeJadwal: location.state.kodeJadwal,
                                                        mataKuliah: location.state.mataKuliah,
                                                        jenisMk: location.state.jenisMk,
                                                        kodeMk: location.state.kodeMk,
                                                        bobot: location.state.bobot,
                                                        sks: location.state.sks,
                                                        kodeMk: location.state.kodeMk
                                                    }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply /> Kembali</Link>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className='table-responsive'>
                                                        <Table>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>No</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>Pertemuan</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>Tanggal</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} colSpan={3}><span>Status Kehadiran</span></th>
                                                                </tr>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Hadir</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Izin</span></th>
                                                                    {/* <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Sakit</span></th> */}
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Alpha</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {detail.map((item, index) => (
                                                                    <tr key={item.id_presensi_mahasiswa} className='border'>
                                                                        <td className='py-2 px-2 border' align='center'>{index + 1}</td>
                                                                        <td className='py-2 px-2 border'> Pertemuan ke {item.jadwalPertemuans[0].pertemuan}</td>
                                                                        <td className='py-2 px-2 border' align='center'>{moment(item.tanggal).format('DD MMMM YYYY')}</td>
                                                                        <td className='py-2 px-2 border' align='center'>
                                                                            {item.masuk == 1 ?
                                                                                <span className='text-[#28A745]'><FaCheck /></span>
                                                                                : ""
                                                                            }
                                                                        </td>
                                                                        <td className='py-2 px-2 border' align='center'>
                                                                            {item.izin == 1 ?
                                                                                <span className='text-[#6C757D]'><FaCheck /></span>
                                                                                : ""
                                                                            }
                                                                        </td>
                                                                        <td className='py-2 px-2 border' align='center'>
                                                                            {item.alpha == 1 ?
                                                                                <span className='text-[#DC3545]'><FaCheck /></span>
                                                                                : ""
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' colSpan={2}><span>Total Hadir</span></th>
                                                                    <th className='fw-bold py-2 border' colSpan={5}><span>{totalMasuk}</span></th>
                                                                </tr>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' colSpan={2}><span>Total Izin</span></th>
                                                                    <th className='fw-bold py-2 border' colSpan={5}><span>{totalIzin}</span></th>
                                                                </tr>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' colSpan={2}><span>Total Sakit</span></th>
                                                                    <th className='fw-bold py-2 border' colSpan={5}><span>{totalSakit}</span></th>
                                                                </tr>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' colSpan={2}><span>Total Alpha</span></th>
                                                                    <th className='fw-bold py-2 border' colSpan={5}><span>{totalAlpha}</span></th>
                                                                </tr>
                                                            </tfoot>
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

export default DetailRekap