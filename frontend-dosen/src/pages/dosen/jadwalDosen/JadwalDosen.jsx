import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Modal, Accordion, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/watch.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'
import { FaCog, FaEdit, FaSearch } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"
import { FileIcon, defaultStyles } from "react-file-icon"

const JadwalDosen = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Jadwal, setJadwal] = useState([])
    const [idProdi, setIdProdi] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [username, setUsername] = useState("")
    const [detailJadwal, setDetailJadwal] = useState([])
    const [detailDosen, setDetailDosen] = useState([])
    const [pendidikan, setPendidikan] = useState("")
    const [status, setStatus] = useState("")
    const [show, setShow] = useState(false)
    const [kodePertemuan, setKodePertemuan] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [namaTugas, setNamaTugas] = useState("")
    const [fileTugas, setFileTugas] = useState("")
    const [ekstensi, setEkstensi] = useState("")
    const [tglAkhir, setTglAkhir] = useState("")
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
        const getDosenByNip = async () => {
            try {
                if (username) {
                    const response = await axios.get(`v1/dosen/getByNipy/${username}`)
                    setDetailDosen(response.data.data)
                    setPendidikan(response.data.data.pendidikans[0].nama_pendidikan)
                }
            } catch (error) {

            }
        }
        getDosenByNip()
    }, [username])

    useEffect(() => {
        getProdi()
    }, [])

    useEffect(() => {
        getProdiById()
    }, [idProdi])

    useEffect(() => {
        getTahunAjaran()
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getJadwal()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester])

    const getProdi = async () => {
        try {
            const response = await axios.get(`v1/prodi/all`)
            setProdi(response.data.data)
        } catch (error) {

        }
    }

    const getProdiById = async () => {
        try {
            if (idProdi) {
                const response = await axios.get(`v1/prodi/getById/${idProdi}`)
                setKodeProdi(response.data.data.code_prodi)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
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
        setPembelajaran("")
        setUrl("")
        setLampiran("")
        setStatusPertemuan("")
        setDeskripsi("")
        setTglAkhir("")
        setNamaTugas("")
        setFileTugas("")
        setLampiran("")
        setShow(false)
    }

    const handleShow = async (e, f) => {
        const response = await axios.get(`v1/jadwalPertemuan/getById/${e}`)
        console.log(response.data.data);
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

    const handleTugas = async (e, f) => {
        const response = await axios.get(`v1/jadwalPertemuan/getById/${e}`)
        setKodePertemuan(response.data.data.code_jadwal_pertemuan)
        setStatus(f)
        setShow(true)
    }

    const loadTugas = (e) => {
        const file = e.target.files[0]
        setFileTugas(file)
    }

    const simpanTugas = async (e) => {
        e.preventDefault()
        if (namaTugas == "") {
            Swal.fire({
                title: 'Judul tugas tidak boleh kosong',
                icon: 'error'
            })
        } else if (deskripsi == "") {
            Swal.fire({
                title: 'Deskripsi tidak boleh kosong',
                icon: 'error'
            })
        } else if (fileTugas == '') {
            Swal.fire({
                title: 'Lampiran Tugas tidak boleh kosong',
                icon: 'error'
            })
        } else if (tglAkhir == "") {
            Swal.fire({
                title: 'Tanggal pengumpulan tidak boleh kosong',
                icon: 'error'
            })
        } else {
            setLoad(true)
            const formData = new FormData()
            formData.append('code_jadwal_pertemuan', kodePertemuan)
            formData.append('deskripsi_tugas', deskripsi)
            formData.append('tugas', namaTugas)
            formData.append('file_tugas', fileTugas)
            formData.append('tanggal_akhir', tglAkhir)
            try {
                await axios.post(`v1/tugas/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
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
                                                        {detailJadwal.url_online ? <Card.Text className='fw-bold'>:&nbsp;{detailJadwal.url_online}</Card.Text> : <Card.Text className='fw-bold text-uppercase'>:&nbsp;Tidak ada</Card.Text>}
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Rencana Materi</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.rencana_materi ? detailJadwal.rencana_materi : 'Tidak ada'}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2 px-3'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Lampiran Materi</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>:&nbsp;{detailJadwal.lampiran_materi ? detailJadwal.lampiran_materi : 'Tidak ada'}</Card.Text>
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
                                    : status == 'edit' ?
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
                                        </Modal.Body>
                                        :
                                        <Modal.Body>
                                            <form onSubmit={simpanTugas}>
                                                <div className='form-group'>
                                                    <label htmlFor="judul" className='h6'>Judul Tugas</label>
                                                    <input id='judul' placeholder='Judul Tugas' value={namaTugas} onChange={(e) => setNamaTugas(e.target.value)} type="text" className='form-control form-control-sm' />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="deskripsi" className='h6'>Deskripsi Tugas</label>
                                                    <textarea
                                                        id="deskripsi"
                                                        cols="30"
                                                        rows="3"
                                                        placeholder='Deskripsi Tugas' value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className='form-control form-control-sm'
                                                    ></textarea>
                                                </div>
                                                <Link ></Link>
                                                <div className='form-group'>
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="lampiran" className='h6'>Lampiran Tugas</label>
                                                            <input id='lampiran' type="file" onChange={loadTugas} className='form-control form-control-sm' />
                                                        </Col>
                                                        <Col>
                                                            <label htmlFor="tanggal" className='h6'>Tanggal Akhir Pengumpulan</label>
                                                            <input id='tanggal' value={tglAkhir} onChange={(e) => setTglAkhir(e.target.value)} type="date" className='form-control form-control-sm' />
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <hr />
                                                <Row>
                                                    <Col>
                                                        <button className='float-end btn btn-info btn-sm'>Simpan</button>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </Modal.Body>
                                }

                            </Modal>

                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Jadwal Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Body className='py-3'>
                                            <Row className='bg-[#E9EAE1] py-3 px-3 shadow-sm rounded'>
                                                <Col lg="6" className='border'>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>NIP</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{detailDosen.nip_ynaa}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Nama</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{detailDosen.nama}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Pendidikan</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{pendidikan}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>prodi</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <select className="form-select form-select-sm" value={idProdi} onChange={(e) => setIdProdi(e.target.value)}>
                                                                <option>Prodi</option>
                                                                {Prodi.map((item) => (
                                                                    <option key={item.id_prodi} value={item.id_prodi}>{item.nama_prodi}</option>
                                                                ))}
                                                            </select>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <select className="form-select form-select-sm" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                                <option>Periode</option>
                                                                {Tahun.map((item) => (
                                                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                                ))}
                                                            </select>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <select className="form-select form-select-sm" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                                                <option>Semester</option>
                                                                {Semester.map((item) => (
                                                                    <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                                                ))}
                                                            </select>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mt-3 shadow'>
                                        <Card.Body className='py-3 px-3'>
                                            <Row>
                                                <Col lg="12">
                                                    {Jadwal.length > 0 ? Jadwal.map((item, index) => (
                                                        <Card key={item.id_jadwal_pertemuan} className='shadow'>
                                                            <Card.Header>
                                                                <Card.Title className='mt-2 mb-0 text-muted'>
                                                                    jadwal kuliah minggu ini
                                                                </Card.Title>
                                                            </Card.Header>
                                                            <Card.Body className='p-2'>
                                                                <Row>
                                                                    <Col>
                                                                        <div className='table-responsive'>
                                                                            <Table>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td className='py-3 text-capitalize' width={20}>Mata Kuliah :</td>
                                                                                        <td className='py-3 text-capitalize' colSpan={2}>{item.jadwalKuliahs[0].sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                                        <td className='py-3'></td>
                                                                                        <td className='py-3 text-capitalize' width={20}>Pertemuan :</td>
                                                                                        <td className='py-3 text-capitalize' colSpan={2}>{item.jenis_pertemuan}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className='py-3 text-capitalize' colSpan={7}></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className='py-3 border text-capitalize'>Hari</td>
                                                                                        <td className='py-3 border text-capitalize'>Tanggal</td>
                                                                                        <td className='py-3 border text-capitalize'>{item.tanggal_pertemuan}</td>
                                                                                        <td className='py-3 border text-capitalize' align='center'>Metode</td>
                                                                                        <td className='py-3 border text-capitalize' align='center' rowSpan={2}>{item.url_online == "" ?
                                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">URL tidak ada</span>
                                                                                            :
                                                                                            <Link to={item.url_online} target='blank'>
                                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">URL ada</span>
                                                                                            </Link>
                                                                                        }</td>
                                                                                        <td className='py-3 border text-capitalize' align='center'>Ruang</td>
                                                                                        <td className='py-2 border text-capitalize' rowSpan={2} align='center'>
                                                                                            <button className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex items-center mr-1' title='Detail' onClick={() => handleShow(item.id_jadwal_pertemuan, 'detail')}><FaSearch /></button>
                                                                                            <button className='bg-[#FFC107] py-2 px-2 rounded-full text-white inline-flex items-center mr-1' title='Edit' onClick={() => handleShow(item.id_jadwal_pertemuan, 'edit')}><FaEdit /></button>
                                                                                            <button className='bg-[#28A745] py-2 px-2 rounded-full text-white inline-flex items-center' title='Tugas' onClick={() => handleTugas(item.id_jadwal_pertemuan, 'tugas')}><FaCog /></button>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className='py-3 border text-capitalize'>{item.jadwalKuliahs[0].hari}</td>
                                                                                        <td className='py-3 border'>Jam</td>
                                                                                        <td className='py-3 border text-capitalize'>{item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai} WIB</td>
                                                                                        <td className='py-3 border text-capitalize' align='center'>{item.metode_pembelajaran}</td>
                                                                                        <td className='py-3 border text-capitalize' align='center'>{item.jadwalKuliahs[0].ruangs[0].nama_ruang}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </Table>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    )) :
                                                        <div className='flex justify-center'>
                                                            <Image src={dataBlank} className='mt-4 ' width={150} />
                                                        </div>}
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

export default JadwalDosen