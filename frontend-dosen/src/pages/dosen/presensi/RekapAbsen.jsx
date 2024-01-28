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

const RekapAbsen = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [Rekapitulasi, setRekapitulasi] = useState([])
    const [dosen, setDosen] = useState([])

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
        getRekapAbsen()
    }, [location])

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

    const getRekapAbsen = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/rekapPresensi/${location.state.kodeJadwal}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
            setRekapitulasi(response.data.data)
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
                                    <Card className='shadow'>
                                        <Card.Body className='py-3 px-3'>
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
                                            <Row>
                                                <Col>
                                                    <div className='table-responsive'>
                                                        <Table>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>No</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>NIM</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>Nama</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} colSpan={4}><span>Rekapitulasi Kehadiran</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }} rowSpan={2}><span>Aksi</span></th>
                                                                </tr>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Total Hadir</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Total Izin</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Total Sakit</span></th>
                                                                    <th className='fw-bold py-2 border text-center' style={{ background: '#E9EAE1' }}><span>Total Alpha</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Rekapitulasi.map((item, index) => (
                                                                    <tr key={index} className='border'>
                                                                        <td className='py-2 px-2 border' align='center'>{index + 1}</td>
                                                                        <td className='py-2 px-2 border'>{item.nim}</td>
                                                                        <td className='py-2 px-2 border'>{item.mahasiswas[0].nama}</td>
                                                                        <td className='py-2 px-2 border' align='center'>{item.total_masuk}</td>
                                                                        <td className='py-2 px-2 border' align='center'>{item.total_izin}</td>
                                                                        <td className='py-2 px-2 border' align='center'>{item.total_sakit}</td>
                                                                        <td className='py-2 px-2 border' align='center'>{item.total_alpha}</td>
                                                                        <td className='py-2 px-2 border' align='center'>
                                                                            <Link
                                                                                to="/presensi/detailrekap"
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
                                                                                    kodeMk: location.state.kodeMk,
                                                                                    nim: item.nim
                                                                                }}
                                                                                className='bg-[#28A745] py-2 px-2 rounded text-white inline-flex items-center no-underline'
                                                                            >Detail</Link>
                                                                        </td>
                                                                    </tr>
                                                                ))}
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

export default RekapAbsen