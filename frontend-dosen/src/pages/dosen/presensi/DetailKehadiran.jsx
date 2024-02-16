import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import dataBlank from "../../../assets/images/watch.svg"
import axios from 'axios'
import moment from 'moment'
import { Circles } from 'react-loader-spinner'
import { FaReply } from 'react-icons/fa'

const DetailKehadiran = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const [dosen, setDosen] = useState('')
    const [Available, setAvailable] = useState([])
    const [NotAvailable, setNotAvailable] = useState([])
    const location = useLocation()

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        console.log(location.state)
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => {
        const getDosenByNipy = async () => {
            try {
                if (username) {
                    const response = await axios.get(`v1/dosen/getByNipy/${username}`)
                    setDosen(response.data.data.nama)
                }
            } catch (error) {

            }
        }
        getDosenByNipy()
    }, [username])

    useEffect(() => {
        getAvailable()
        getNotAvailable()
    }, [location, username])

    const getAvailable = async () => {
        try {
            if (location && username) {
                const response = await axios.get(`v1/presensiMhs/getPresensiDosenAvailable/${location.state.kodeJadwal}/${username}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
                setAvailable(response.data.data)
            }
        } catch (error) {

        }
    }

    const getNotAvailable = async () => {
        try {
            if (location && username) {
                const response = await axios.get(`v1/presensiMhs/getPresensiDosenNoAvailable/${location.state.kodeJadwal}/${username}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
                setNotAvailable(response.data.data.rows)
            }
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
                                <h2 className='fs-4 font-bold'>Riwayat Kehadiran Dosen</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='mb-3 shadow'>
                                        <Card.Body className='py-3'>
                                            <Row className='shadow-sm py-3 rounded' style={{ background: '#E9EAE1' }}>
                                                <Col lg="7">
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Matakuliah</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a> {location.state.mataKuliah}</a>
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
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Jenis MK</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.jenisMk}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="5">
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Bobot MK</a>
                                                        </Col>
                                                        <Col className='flex gap-2 capitalize'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.bobot}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>SKS</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.sks}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Dosen</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{dosen}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body className='py-3 px-3 shadow'>
                                            <Row className='mb-2'>
                                                <Col>
                                                    <Link to='/presensi' state={{
                                                        kodeThn: location.state.kodeThn,
                                                        kodeSmt: location.state.kodeSmt,
                                                        kodeJen: location.state.kodeJen,
                                                        kodeFkl: location.state.kodeFkl,
                                                        kodePro: location.state.kodePro,
                                                        idProdi: location.state.idProdi,
                                                    }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply /> Kembali</Link>
                                                </Col>
                                            </Row>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tanggal</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jam Masuk</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jam Pulang</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Keterangan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Available.map((item, index) => (
                                                            <tr key={item.id_presensi_dosen} className='border'>
                                                                <td className='py-3'>{index + 1}</td>
                                                                <td className='py-3'>Pertemuan {item.jadwalPertemuans[0].pertemuan}</td>
                                                                <td className='py-3'><span className='capitalize'>{item.jadwalPertemuans[0].jenis_pertemuan}</span></td>
                                                                <td className='py-3'>{moment(item.tanggal).format('DD MMMM YYYY')}</td>
                                                                <td className='py-3'>{item.jam_masuk == '' ? '-' : item.jam_masuk + 'WIB'} </td>
                                                                <td className='py-3'>{item.jam_pulang == '' ? '-' : item.jam_pulang + 'WIB'}</td>
                                                                <td className='py-3'>
                                                                    {
                                                                        item.keterangan == 'hadir' || item.keterangan == 'Hadir' ?
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#007BFF] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                            :
                                                                            item.keterangan == 'izin' || item.keterangan == 'Izin' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#6C757D] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                                :
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {NotAvailable.map((item, index) => (
                                                            <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                <td className='py-3'>{index + 1 + Available.length}</td>
                                                                <td className='py-3'>Pertemuan {item.pertemuan}</td>
                                                                <td className='py-3'><span className='capitalize'>{item.jenis_pertemuan}</span></td>
                                                                <td className='py-3'>{moment(item.tanggal_pertemuan).format('DD MMMM YYYY')}</td>
                                                                <td className='py-3'>-</td>
                                                                <td className='py-3'>-</td>
                                                                <td className='py-3'>
                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#FFC107] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none capitalize">Belum Absen</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
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

export default DetailKehadiran