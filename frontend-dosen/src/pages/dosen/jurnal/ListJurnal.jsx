import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image, Modal } from 'react-bootstrap'
import dataBlank from "../../../assets/images/watch.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Circles } from 'react-loader-spinner'
import moment from 'moment'
import { FaPlus, FaReply } from 'react-icons/fa'
import Swal from 'sweetalert2'

const ListJurnal = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [Jurnal, setJurnal] = useState([])
    const [Pertemuan, setPertemuan] = useState([])
    const [pertemuanTerpilih, setPertemuanTerpilih] = useState([])
    const [show, setShow] = useState(false)
    const [kodePertemuan, setKodePertemuan] = useState("")
    const [materi, setMateri] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [idJurnal, setIdJurnal] = useState("")
    const [statusJurnal, setStatusJurnal] = useState([])
    const [modal, setModal] = useState("")
    const [namaPertemuan, setNamaPertemuan] = useState("")
    const [jenis, setJenis] = useState("")
    const [tanggal, setTanggal] = useState("")


    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        // console.log(location.state)
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
        getJurnalByJadwalKuliah()
    }, [location])

    useEffect(() => {
        getKodePertemuan()
    }, [Pertemuan])

    useEffect(() => {
        getPertemuan()
    }, [location])

    useEffect(() => {
        getStatusJurnal()
    }, [pertemuanTerpilih])

    const getJurnalByJadwalKuliah = async () => {
        try {
            const response = await axios.get(`v1/jurnalDosen/all/${location.state.kodeJdl}`)
            setJurnal(response.data.data)
        } catch (error) {

        }
    }

    const getPertemuan = async () => {
        try {
            const response = await axios.get(`v1/jurnalDosen/getPertemuanByDosen/${location.state.kodeJdl}`)
            setPertemuan(response.data.data)
        } catch (error) {

        }
    }

    const getKodePertemuan = () => {
        var i = Pertemuan.map(item => (
            item.code_jadwal_pertemuan
        ))
        setPertemuanTerpilih(i)
    }

    const getStatusJurnal = async () => {
        if (pertemuanTerpilih.length > 0) {
            let statuss = []
            let promises = []
            for (let i = 0; i < pertemuanTerpilih.length; i++) {
                const t = await axios.get('v1/jurnalDosen/getStatusJurnal/' + pertemuanTerpilih[i]).then(response => {
                    statuss.push(response.data.data)
                })
                promises.push(t)

            }
            if (pertemuanTerpilih.length != 0) {
                Promise.all(promises).then(() => setStatusJurnal(statuss))
            }
        }
    }

    const handleShowTambah = async (e, f, g, h, i) => {
        setKodePertemuan(e)
        setModal(f)
        setNamaPertemuan(g)
        setTanggal(h)
        setJenis(i)
        setShow(true)
    }

    const handleShowEdit = async (e, f, g, h, i) => {
        try {
            const response = await axios.get(`v1/jurnalDosen/getByCodeJadper/${e}`)
            setIdJurnal(response.data.data.id_jurnal_dosen)
            setKeterangan(response.data.data.keterangan)
            setMateri(response.data.data.materi_pembahasan)
            setKodePertemuan(e)
            setModal(f)
            setNamaPertemuan(g)
            setTanggal(h)
            setJenis(i)
        } catch (error) {

        }
        setShow(true)
    }

    const handleClose = () => {
        setKodePertemuan("")
        setMateri("")
        setKeterangan("")
        setModal("")
        setIdJurnal("")
        setNamaPertemuan("")
        setTanggal("")
        setJenis("")
        setShow(false)
    }

    const simpanJurnal = async (e) => {
        e.preventDefault()
        if (kodePertemuan == "") {
            Swal.fire({
                title: 'Pertemuan kosong',
                icon: 'error'
            })
        } else if (materi == "") {
            Swal.fire({
                title: 'Materi pembahasan kosong',
                icon: 'error'
            })
        } else {
            setLoad(true)
            try {
                await axios.post('v1/jurnalDosen/create', {
                    codeThn: location.state.kodeThn,
                    codeSmt: location.state.kodeSmt,
                    codeJnj: location.state.kodeJen,
                    codeFks: location.state.kodeFkl,
                    codePrd: location.state.kodePro,
                    codeJadper: kodePertemuan,
                    nipy: username,
                    materi_pembahasan: materi,
                    keterangan: keterangan
                }).then(function (response) {
                    handleClose()
                    setLoad(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Jurnal kehadiran berhasil disimpan',
                        icon: 'success'
                    }).then(() => {
                        getJurnalByJadwalKuliah()
                        getStatusJurnal()
                        getPertemuan()
                    })
                })
            } catch (error) {
                // console.log(error.response)
            }
        }
    }

    const updateJurnal = async (e) => {
        e.preventDefault()
        if (materi == "") {
            Swal.fire({
                title: 'Materi pembahasan kosong',
                icon: 'error'
            })
        } else {
            setLoad(true)
            try {
                await axios.put(`v1/jurnalDosen/update/${idJurnal}`, {
                    materi_pembahasan: materi,
                    keterangan: keterangan
                }).then(function (response) {
                    handleClose()
                    setLoad(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Jurnal kehadiran berhasil diedit',
                        icon: 'success'
                    }).then(() => {
                        getJurnalByJadwalKuliah()
                    })
                })
            } catch (error) {
                // console.log(error.response)
            }
        }
    }

    const hapusJurnal = (jurnalId) => {
        Swal.fire({
            title: "Apakah anda yakin untuk menghapus?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(
                        `v1/jurnalDosen/delete/${jurnalId}`
                    ).then((response) => {
                        Swal.fire({
                            title: 'Terhapus',
                            icon: "success"
                        }).then(() => {
                            getPertemuan()
                            getStatusJurnal()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <Layout>
            <title>Jurnal Kehadiran</title>
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
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                size='lg'
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {/* <span className='capitalize'>{modal}</span> jurnal pertemuan ke {namaPertemuan} */}
                                    </Modal.Title>
                                </Modal.Header>
                                {modal == 'tambah' ?
                                    <Modal.Body>
                                        <form onSubmit={simpanJurnal}>
                                            <Row>
                                                <Col>
                                                    <div className='form-group'>
                                                        <label htmlFor="judul" className='h6'>Pertemuan</label>
                                                        <input type="text" value={`Pertemuan ke ${namaPertemuan}`} className='form-control from-control-sm' disabled />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='form-group'>
                                                        <label htmlFor="judul" className='h6'>Tanggal</label>
                                                        <input type="text" value={moment(tanggal).format('DD MMMM YYYY')} className='form-control from-control-sm' disabled />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className='form-group'>
                                                        <label htmlFor="judul" className='h6'>Jenis Pertemuan</label>
                                                        <input type="text" value={jenis} className='form-control from-control-sm' disabled />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className='form-group'>
                                                        <label htmlFor="judul" className='h6'>Materi Pembahasan</label>
                                                        <textarea
                                                            id="deskripsi"
                                                            cols="30"
                                                            rows="3"
                                                            placeholder='Materi Pembahasan'
                                                            value={materi}
                                                            onChange={(e) => setMateri(e.target.value)}
                                                            className='form-control form-control-sm'
                                                        ></textarea>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="deskripsi" className='h6'>Keterangan</label>
                                                        <textarea
                                                            id="deskripsi"
                                                            cols="30"
                                                            rows="3"
                                                            placeholder='Keterangan'
                                                            value={keterangan}
                                                            onChange={(e) => setKeterangan(e.target.value)}
                                                            className='form-control form-control-sm'
                                                        ></textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col>
                                                    <button className='btn btn-sm btn-primary float-right'>Simpan</button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Modal.Body>
                                    :
                                    <Modal.Body>
                                        {modal == 'edit' ?
                                            <form onSubmit={updateJurnal}>
                                                <Row>
                                                    <Col>
                                                        <div className='form-group'>
                                                            <label htmlFor="judul" className='h6'>Pertemuan</label>
                                                            <input type="text" value={`Pertemuan ke ${namaPertemuan}`} className='form-control from-control-sm' disabled />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='form-group'>
                                                            <label htmlFor="judul" className='h6'>Tanggal</label>
                                                            <input type="text" value={moment(tanggal).format('DD MMMM YYYY')} className='form-control from-control-sm' disabled />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='form-group'>
                                                            <label htmlFor="judul" className='h6'>Jenis Pertemuan</label>
                                                            <input type="text" value={jenis} className='form-control from-control-sm' disabled />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <div className='form-group'>
                                                            <label htmlFor="judul" className='h6'>Materi Pembahasan</label>
                                                            <textarea
                                                                id="deskripsi"
                                                                cols="30"
                                                                rows="3"
                                                                placeholder='Materi Pembahasan'
                                                                value={materi}
                                                                onChange={(e) => setMateri(e.target.value)}
                                                                className='form-control form-control-sm'
                                                            ></textarea>
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor="deskripsi" className='h6'>Keterangan</label>
                                                            <textarea
                                                                id="deskripsi"
                                                                cols="30"
                                                                rows="3"
                                                                placeholder='Keterangan'
                                                                value={keterangan}
                                                                onChange={(e) => setKeterangan(e.target.value)}
                                                                className='form-control form-control-sm'
                                                            ></textarea>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col>
                                                        <button className='btn btn-sm btn-primary float-right'>Edit</button>
                                                    </Col>
                                                </Row>
                                            </form> :
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className='py-2 px-4'>Pertemuan</td>
                                                        <td className='py-2'>&nbsp;:&nbsp;</td>
                                                        <td className='py-2 '>Pertemuan ke {namaPertemuan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='py-2 px-4'>Tanggal</td>
                                                        <td className='py-2'>&nbsp;:&nbsp;</td>
                                                        <td className='py-2 '>{moment(tanggal).format('DD MMMM YYYY')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='py-2 px-4'>Jenis Pertemuan</td>
                                                        <td className='py-2'>&nbsp;:&nbsp;</td>
                                                        <td className={`py-2 ${jenis == 'uas' || jenis == 'uts' ? 'uppercase' : 'capitalize'}`}>{jenis}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='py-2 px-4'>Materi Pembahasan</td>
                                                        <td className='py-2'>&nbsp;:&nbsp;</td>
                                                        <td className='py-2 '>
                                                            {materi}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='py-2 px-4'>Keterangan</td>
                                                        <td className='py-2'>&nbsp;:&nbsp;</td>
                                                        <td className='py-2 '>
                                                            {keterangan}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </Modal.Body>
                                }
                            </Modal>
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Jurnal Kehadiran</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Body className='py-3'>
                                            <Row className='bg-[#E9EAE1] py-3 px-3 shadow-sm rounded'>
                                                <Col lg="6" className='border'>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Matakuliah</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{location.state.namaMk}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Jenis Mk</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{location.state.jenisMk}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>SKS</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{location.state.totalSks}</Card.Text>
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
                                                            <Card.Text className='fw-bold text-uppercase'>{location.state.namaPro}</Card.Text>
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
                                                            <Card.Text className='fw-bold text-uppercase'>{location.state.namaTahun}</Card.Text>
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
                                                            <Card.Text className='fw-bold text-uppercase'>{location.state.namaSemester}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card className='shadow mt-3'>
                                        <Card.Body className='p-3'>
                                            <div className='flex gap-2 mb-2'>
                                                <Link
                                                    to='/jurnal'
                                                    state={{
                                                        kodeThn: location.state.kodeThn,
                                                        kodeSmt: location.state.kodeSmt,
                                                        kodeJen: location.state.kodeJen,
                                                        kodeFkl: location.state.kodeFkl,
                                                        kodePro: location.state.kodePro,
                                                        idProdi: location.state.idProdi,
                                                        idTahun: location.state.idTahun,
                                                        idSemester: location.state.idSemester,
                                                    }}
                                                    className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply />Kembali</Link>
                                                {/* <button onClick={() => setShow(true)} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaPlus />Tambah Jurnal</button> */}
                                            </div>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tanggal</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status Jurnal</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Pertemuan.map((item, index) => (
                                                            <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                <td className='py-2'>{index + 1}</td>
                                                                <td className='py-2'>Pertemuan ke {item.pertemuan}</td>
                                                                <td className='py-2'>{moment(item.tanggal_pertemuan).format('DD MMMM YYYY')}</td>
                                                                <td className={`py-2 ${item.jenis_pertemuan == 'uts' || item.jenis_pertemuan == 'uas' ? 'uppercase' : 'capitalize'}`}>{item.jenis_pertemuan}</td>
                                                                <td className='py-2'>
                                                                    {
                                                                        statusJurnal[index] == 'sudah diisi' ?
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{statusJurnal[index]}</span>
                                                                            :
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{statusJurnal[index]}</span>
                                                                    }
                                                                </td>
                                                                <td className='py-2'>
                                                                    {statusJurnal[index] == 'belum diisi' ?
                                                                        <button
                                                                            className='btn btn-sm btn-primary'
                                                                            onClick={() => handleShowTambah(
                                                                                item.code_jadwal_pertemuan,
                                                                                'tambah',
                                                                                item.pertemuan,
                                                                                item.tanggal_pertemuan,
                                                                                item.jenis_pertemuan
                                                                            )}
                                                                        >Tambah</button> :
                                                                        <div className='flex gap-1'>
                                                                            <button
                                                                                className='btn btn-sm btn-info'
                                                                                onClick={() => handleShowEdit(
                                                                                    item.code_jadwal_pertemuan,
                                                                                    'detail',
                                                                                    item.pertemuan,
                                                                                    item.tanggal_pertemuan,
                                                                                    item.jenis_pertemuan
                                                                                )}
                                                                            >Detail</button>
                                                                            <button
                                                                                className='btn btn-sm btn-warning'
                                                                                onClick={() => handleShowEdit(
                                                                                    item.code_jadwal_pertemuan,
                                                                                    'edit',
                                                                                    item.pertemuan,
                                                                                    item.tanggal_pertemuan,
                                                                                    item.jenis_pertemuan
                                                                                )}
                                                                            >Edit</button>
                                                                        </div>
                                                                    }
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

export default ListJurnal