import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Modal, Button, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/noData.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const JadwalDosen = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Jadwal, setJadwal] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [username, setUsername] = useState("")
    const [detailJadwal, setDetailJadwal] = useState([])
    const [status, setStatus] = useState("")
    const [show, setShow] = useState(false)
    const [pembelajaran, setPembelajaran] = useState("")
    const [url, setUrl] = useState("")
    const [rencana, setRencana] = useState("")
    const [lampiran, setLampiran] = useState("")
    const [statusPertemuan, setStatusPertemuan] = useState("")
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
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getTahunAjaran()
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getJadwal()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getFakultas = async () => {
        try {
            if (kodeJenjang != 0) {
                const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
                setFakultas(response.data.data)
            } else {
                setKodeFakultas()
            }
        } catch (error) {

        }
    }

    const getProdi = async () => {
        try {
            if (kodeFakultas != 0) {
                const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
                setProdi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get(`v1/tahunAjaran/all`)
            setTahun(response.data.data)
        } catch (error) {

        }

    }

    const getSemester = async () => {
        try {
            if (kodeTahun) {
                const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
                setSemester(response.data.data)
            }
        } catch (error) {

        }
    }

    const getJadwal = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester) {
                const response = await axios.get(`v1/jadwalKuliah/JadwalPertemuanDosen/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}`)
                setJadwal(response.data.data)
            }
        } catch (error) {

        }
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = async (e, f) => {
        const response = await axios.get(`v1/jadwalPertemuan/getById/${e}`)
        setDetailJadwal(response.data.data)
        setPembelajaran(response.data.data.metode_pembelajaran)
        setUrl(response.data.data.url_online)
        setRencana(response.data.data.rencana_materi)
        // setLampiran(response.data.data)
        setStatusPertemuan(response.data.data.status_pertemuan)
        setStatus(f)
        setShow(true)
    }

    const loadFile = (e) => {
        const file = e.target.files[0]
        setLampiran(file)
    }

    const simpanPertemuan = async (e) => {
        e.preventDefault()
        setLoad(true)
        const formData = new FormData()
        formData.append('metode_pembelajaran', pembelajaran)
        formData.append('url_online', url)
        formData.append('rencana_materi', rencana)
        formData.append('lampiran_materi', lampiran)
        formData.append('status_pertemuan', statusPertemuan)
        try {
            await axios.put(`v1/jadwalKuliah/updateJadwalPertemuanDosen/${detailJadwal.id_jadwal_pertemuan}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).
                then(function (response) {
                    setLoad(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        handleClose()
                        getJadwal()
                    });
                })
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Jadwal Kuliah</title>
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
                                size='lg'
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                                {status == 'detail' ?
                                    <Modal.Body>
                                        <Row>
                                            <Col>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Pertemuan Ke</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.pertemuan}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Hari, Tanggal</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal ? detailJadwal.jadwalKuliahs[0].hari + ', ' + moment(detailJadwal.tanggal_pertemuan).format('DD MMMM YYYY') : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Jenis Pertemuan</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.jenis_pertemuan}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Jam</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal ? detailJadwal.jadwalKuliahs[0].jam_mulai + ' - ' + detailJadwal.jadwalKuliahs[0].jam_selesai : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Pembelajaran</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.metode_pembelajaran}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>URL Online</Card.Text>
                                                    </Col>
                                                    <Col className='p-0 flex gap-2'>
                                                        <Card.Text className='fw-bold'>:&nbsp;{detailJadwal.url_online}</Card.Text> <Link to={detailJadwal.url_online} target='blank' title='Buka URL' className='text-black'><MdOpenInNew /></Link>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Rencana Materi</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.rencana_materi}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Lampiran Materi</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.lampiran_materi}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Status Pertemuan</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.status_pertemuan}</Card.Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    :
                                    <Modal.Body>
                                        <form onSubmit={simpanPertemuan}>
                                            <Row>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form1" className="form-label">Pertemuan ke</label>
                                                    <input type="text" className="form-control" id="form1" disabled readOnly value={detailJadwal.pertemuan} />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form2" className="form-label">Hari, Tanggal</label>
                                                    <input type="text" className="form-control" id="form2" disabled readOnly value={detailJadwal != 0 ? detailJadwal.jadwalKuliahs[0].hari + ', ' + moment(detailJadwal.tanggal_pertemuan).format('DD MMMM YYYY') : ""} />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form3" className="form-label">Jenis Pertemuan</label>
                                                    <input type="text" className="form-control" id="form3" disabled readOnly value={detailJadwal.jenis_pertemuan} />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form4" className="form-label">Jam</label>
                                                    <input type="text" className="form-control" id="form4" disabled readOnly value={detailJadwal != 0 ? detailJadwal.jadwalKuliahs[0].jam_mulai + ' - ' + detailJadwal.jadwalKuliahs[0].jam_selesai : ""} />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form5" className="form-label">Pembelajaran</label>
                                                    <select id="form5" className='form-select' value={pembelajaran} onChange={(e) => setPembelajaran(e.target.value)}>
                                                        <option value="">Pembelajaran</option>
                                                        <option value="offline">Offline</option>
                                                        <option value="online">Online</option>
                                                        <option value="campur">Campur</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form6" className="form-label">URL Online</label>
                                                    <input type="text" className="form-control" id="form6" value={url} onChange={(e) => setUrl(e.target.value)} placeholder='https://www.example.com' />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form7" className="form-label">Rencana Materi</label>
                                                    <input type="text" className="form-control" id="form7" value={rencana} onChange={(e) => setRencana(e.target.value)} placeholder='Rencana Materi' />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="formFile" className="form-label">Lampiran Materi</label>
                                                    <input className="form-control" type="file" onChange={loadFile} id="formFile" />
                                                </div>
                                                <div className="mb-3 col-lg-6">
                                                    <label htmlFor="form9" className="form-label">Status Pertemuan</label>
                                                    <select id="form9" className='form-select' value={statusPertemuan} onChange={(e) => setStatusPertemuan(e.target.value)}>
                                                        <option value="">Status Pertemuan</option>
                                                        <option value="terjadwal">Terjadwal</option>
                                                        <option value="selesai">Selesai</option>
                                                        <option value="diganti">Diganti</option>
                                                    </select>
                                                </div>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col>
                                                    <button className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center mt-2 float-right'><FaEdit /> &nbsp; <span>Edit</span></button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Modal.Body>}

                            </Modal>

                            <div className="page-header">
                                <h3 className="page-title">Jadwal Kuliah</h3>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Body className='p-3'>
                                            <Row>
                                                <Col>
                                                    <div className="grid lg:grid-cols-5 gap-2">
                                                        <div>
                                                            <select className="form-select" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                                                <option>Jenjang Pendidikan</option>
                                                                {Jenjang.map((item) => (
                                                                    <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <select className="form-select" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                                                <option>Fakultas</option>
                                                                {Fakultas.map((item) => (
                                                                    <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <select className="form-select" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                                                <option>Prodi</option>
                                                                {Prodi.map((item) => (
                                                                    <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <select className="form-select" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                                <option>Periode</option>
                                                                {Tahun.map((item) => (
                                                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <select className="form-select" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                                                <option>Semester</option>
                                                                {Semester.map((item) => (
                                                                    <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Card.Body>
                                    </Card>
                                    {kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester ?
                                        <Card className="mt-3 shadow">
                                            <Card.Body className="px-3">
                                                <Row>
                                                    <Col>
                                                        <div className="table-responsive">
                                                            <Table hover>
                                                                <thead>
                                                                    <tr className='border'>
                                                                        <th colSpan={10} className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Jadwal Kuliah Mingguan</th>
                                                                    </tr>
                                                                    <tr className='border'>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>#</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Hari</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Tanggal</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Jam</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Jenis Pertemuan</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Pembelajaran</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>URL</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Ruang</th>
                                                                        <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>Aksi</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Jadwal.length == 0 ?
                                                                        <tr className='border'>
                                                                            <td colSpan={10} align='center'>
                                                                                <Image src={dataBlank} thumbnail width={150} />
                                                                                <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                            </td>
                                                                        </tr>
                                                                        :
                                                                        Jadwal.map((item, index) => (
                                                                            <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                                <th scope='row' className='py-2'>{index + 1}</th>
                                                                                <td className='py-2 text-capitalize' align='center'>{item.jadwalKuliahs[0].hari}</td>
                                                                                <td className='py-2' align='center'>{item.tanggal_pertemuan}</td>
                                                                                <td className='py-2 text-capitalize' align='center'>{item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai}</td>
                                                                                <td className='py-2' align='center'>{item.jadwalKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                                <td className='py-2 text-capitalize' align='center'>{item.jenis_pertemuan}</td>
                                                                                <td className='py-2 text-capitalize' align='center'>{item.metode_pembelajaran}</td>
                                                                                <td className='py-2' align='center'>{item.url_online == "" ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">URL tidak ada</span>
                                                                                    :
                                                                                    <Link to="https://www.ponpesnaa.net" target='blank'>
                                                                                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">buka url</span>
                                                                                    </Link>
                                                                                }
                                                                                </td>
                                                                                <td className='py-2 text-capitalize' align='center'>{item.jadwalKuliahs[0].ruangs[0].nama_ruang}</td>
                                                                                <td className='py-2 text-capitalize' align='center'>
                                                                                    <button className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex items-center' onClick={() => handleShow(item.id_jadwal_pertemuan, 'detail')}><FaSearch /></button>
                                                                                    <button className='bg-[#FFC107] py-2 px-2 rounded-full text-white inline-flex items-center ml-1' onClick={() => handleShow(item.id_jadwal_pertemuan, 'edit')}><FaEdit /></button>
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
                                        : ""}
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default JadwalDosen