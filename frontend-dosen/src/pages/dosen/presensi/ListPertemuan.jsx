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

const ListPertemuan = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [Pertemuan, setPertemuan] = useState([])
    const [dosen, setDosen] = useState([])
    const [kodePertemuan, setKodePertemuan] = useState([])
    const [StatusAbsen, setStatusAbsen] = useState([])

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        console.log(location.state);
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
        getJadwalPertemuan()
    }, [location])

    useEffect(() => {
        getKodePertemuan()
    }, [Pertemuan])

    useEffect(() => {
        getStatusAbsen()
    }, [kodePertemuan])

    const getJadwalPertemuan = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/getPertemuanByDosen/${location.state.kodeJadwal}`)
            setPertemuan(response.data.data)
        } catch (error) {

        }
    }

    const getKodePertemuan = () => {
        var i = Pertemuan.map(item => (
            item.code_jadwal_pertemuan
        ))
        setKodePertemuan(i)
    }

    const getStatusAbsen = async () => {
        if (kodePertemuan.length > 0) {
            let statuss = []
            let promises = []
            for (let i = 0; i < kodePertemuan.length; i++) {
                const t = await axios.get('v1/presensiMhs/getStatusAbsen/' + kodePertemuan[i]).then(response => {
                    statuss.push(response.data.data)
                })
                promises.push(t)

            }
            if (kodePertemuan.length != 0) {
                Promise.all(promises).then(() => setStatusAbsen(statuss))
            }
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
                                <h2 className='fs-4 font-bold'>Presensi</h2>
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
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Matakuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tanggal</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Pertemuan.map((item, index) => (
                                                            <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                <td className='py-2'>{index + 1}</td>
                                                                <td className='py-2'>{item.pertemuan}</td>
                                                                <td className='py-2'>{location.state.mataKuliah}</td>
                                                                <td className='py-2'>{moment(item.tanggal_pertemuan).format('DD MMMM YYYY')}</td>
                                                                <td className='py-2'><span className='capitalize'>{item.jenis_pertemuan}</span></td>
                                                                <td className='py-2'>
                                                                    <span className='capitalize'>
                                                                        {
                                                                            StatusAbsen[index] == 'sudah dilakukan' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{StatusAbsen[index]}</span>
                                                                                :
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{StatusAbsen[index]}</span>
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className='py-2'>
                                                                    <Link
                                                                        to='/presensi/mahasiswa'
                                                                        state={{
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
                                                                            kodePert: item.code_jadwal_pertemuan,
                                                                            kodeMk: location.state.kodeMk,
                                                                            tanggal: moment(item.tanggal_pertemuan).format('DD MMMM YYYY'),
                                                                            pertemuan: item.pertemuan,
                                                                        }}
                                                                        className='btn btn-sm btn-primary capitalize'>
                                                                        absen
                                                                    </Link>
                                                                    <Link to='/presensi/validasi'
                                                                        state={{
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
                                                                            kodePert: item.code_jadwal_pertemuan,
                                                                            kodeMk: location.state.kodeMk,
                                                                            tanggal: moment(item.tanggal_pertemuan).format('DD MMMM YYYY'),
                                                                            pertemuan: item.pertemuan,
                                                                        }}
                                                                        className='btn btn-sm btn-success ml-1 capitalize'>
                                                                        validasi
                                                                    </Link>
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

export default ListPertemuan