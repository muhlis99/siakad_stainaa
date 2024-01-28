import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import dataBlank from "../../../assets/images/watch.svg"
import axios from 'axios'
import moment from 'moment'
import { Circles } from 'react-loader-spinner'
import { FaCog, FaReply } from 'react-icons/fa'
import Swal from 'sweetalert2'

const ValidasiMhs = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [Available, setAvailable] = useState([])
    const [NotAvailable, setNotAvailable] = useState([])
    const [jumlah, setJumlah] = useState("")
    const [show, setShow] = useState(false)
    const [idPresensi, setIdPresensi] = useState("")
    const [namaMhs, setNamaMhs] = useState("")
    const [kehadiran, setKehadiran] = useState("")
    const [key, setKey] = useState("")
    const [nim, setNim] = useState("")
    const [dosen, setDosen] = useState([])

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
        getMhsAvailable()
        getMhsNotAvailable()
    }, [location])

    useEffect(() => {
        getJumlahAvailable()
    }, [Available])

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

    const getMhsAvailable = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/getMhsValidasiAvailable/${location.state.kodePert}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
            setAvailable(response.data.data)
        } catch (error) {

        }
    }

    const getJumlahAvailable = () => {
        setJumlah(Available.length)
    }

    const getMhsNotAvailable = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/getMhsValidasiNoAvailable/${location.state.kodePert}/${location.state.kodeMk}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
            setNotAvailable(response.data.data)
        } catch (error) {

        }
    }

    const handleShow = (e, f, g, h) => {
        setIdPresensi(e)
        setNim(h)
        setNamaMhs(f)
        setKehadiran(g)
        if (g == 'hadir' || g == 'Hadir') {
            setKey('A')
        } else if (g == 'izin' || g == 'Izin') {
            setKey('B')
        } else if (g == 'sakit' || g == 'Sakit') {
            setKey('C')
        } else if (g == 'alpha' || g == 'Alpha') {
            setKey('D')
        }
        setShow(true)
    }

    const handleClose = () => {
        setIdPresensi("")
        setNim("")
        setNamaMhs("")
        setKehadiran("")
        setKey("")
        setShow(false)
    }

    function onValueChange(event) {
        setKey(event.target.value)
    }

    const simpanValidasi = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            await axios.put(`v1/presensiMhs/validasiPresensi/${idPresensi}`, {
                codeThn: location.state.kodeThn,
                codeSmt: location.state.kodeSmt,
                codeJnj: location.state.kodeJen,
                codeFks: location.state.kodeFkl,
                codePrd: location.state.kodePro,
                codeJadper: location.state.kodePert,
                absensi: key,
                nim: nim
            }).then(function (response) {
                setLoad(false)
                handleClose()
                Swal.fire({
                    title: response.data.message,
                    icon: 'success',
                }).then(() => {
                    getMhsAvailable()
                    getMhsNotAvailable()
                })
            })
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
                                    wrapperclassName=""
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
                                size='md'
                                centered
                            >
                                <form onSubmit={simpanValidasi}>
                                    <Modal.Header closeButton>
                                        <Modal.Title></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Row>
                                            <Col>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>NIM</td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className='capitalize'>{nim}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Nama</td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td>{namaMhs}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Status</td>
                                                            <td>&nbsp;:&nbsp;</td>
                                                            <td className='capitalize'>{kehadiran}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" onChange={onValueChange} checked={key === "A"} value="A" />
                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                        Hadir
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onChange={onValueChange} checked={key === "B"} value="B" />
                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                        Izin
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" onChange={onValueChange} checked={key === "C"} value="C" />
                                                    <label className="form-check-label" htmlFor="exampleRadios3">
                                                        Sakit
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" onChange={onValueChange} checked={key === "D"} value="D" />
                                                    <label className="form-check-label" htmlFor="exampleRadios4">
                                                        Alpha
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className='bg-[#0069D9] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'>Simpan</button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Presensi</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='mb-3'>
                                        <Card.Body className='py-3 shadow'>
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
                                                            <a>SKS</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.sks}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="5">
                                                    <Row className='mb-2'>
                                                        <Col lg="4">
                                                            <a>Pertemuan Ke</a>
                                                        </Col>
                                                        <Col className='flex gap-2 capitalize'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.pertemuan}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="4">
                                                            <a>Tanggal</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{location.state.tanggal}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="4">
                                                            <a>Dosen</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><span className='text-[15px] mt-1'>{dosen}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body className='shadow p-3'>
                                            <Row className='mb-2'>
                                                <Col>
                                                    <Link to='/presensi/pertemuan' state={{
                                                        kodeThn: location.state.kodeThn,
                                                        kodeSmt: location.state.kodeSmt,
                                                        kodeJen: location.state.kodeJen,
                                                        kodeFkl: location.state.kodeFkl,
                                                        kodePro: location.state.kodePro,
                                                        idProdi: location.state.idProdi,
                                                        kodeJadwal: location.state.kodeJadwal,
                                                        mataKuliah: location.state.mataKuliah,
                                                        jenisMk: location.state.jenisMk,
                                                        bobot: location.state.bobot,
                                                        sks: location.state.sks,
                                                        kodeMk: location.state.kodeMk
                                                    }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply /> Kembali</Link>
                                                </Col>
                                            </Row>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>NIM</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Nama</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Keterangan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Available.map((item, index) => (
                                                            <tr key={item.id_presensi_mahasiswa} className='border'>
                                                                <td className='py-2'>{index + 1}</td>
                                                                <td className='py-2'>{item.nim}</td>
                                                                <td className='py-2'>{item.mahasiswas[0].nama}</td>
                                                                <td className='py-2'>
                                                                    {
                                                                        item.keterangan == 'hadir' || item.keterangan == 'Hadir' ?
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                            : item.keterangan == 'sakit' || item.keterangan == 'Sakit' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#6C757D] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                                : item.keterangan == 'izin' || item.keterangan == 'Izin' ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                                    :
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                                    }
                                                                </td>
                                                                <td className='py-2'>
                                                                    <button onClick={() => handleShow(item.id_presensi_mahasiswa, item.mahasiswas[0].nama, item.keterangan, item.nim)} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline'><FaCog /></button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {NotAvailable.map((item, index) => (
                                                            <tr key={index} className='border'>
                                                                <td className='py-2'>{index + 1 + jumlah}</td>
                                                                <td className='py-2'>{item.nim}</td>
                                                                <td className='py-2'>{item.mahasiswas[0].nama}</td>
                                                                <td className='py-2'>
                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#FFC107] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none capitalize">Tidak Absen</span>
                                                                </td>
                                                                <td className='py-2'>
                                                                    <button onClick={() => handleShow(1, item.mahasiswas[0].nama, '', item.nim)} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline' ><FaCog /></button>
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

export default ValidasiMhs