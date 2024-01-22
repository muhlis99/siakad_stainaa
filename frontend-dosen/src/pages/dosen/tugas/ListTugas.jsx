import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/watch.svg"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from "moment"
import Swal from 'sweetalert2'

const ListTugas = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [AllTugas, setAllTugas] = useState([])
    const [load, setLoad] = useState(false)
    const [detailDosen, setDetailDosen] = useState([])
    const [pendidikan, setPendidikan] = useState("")
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [idProdi, setIdProdi] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [idTugas, setIdTugas] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [namaTugas, setNamaTugas] = useState("")
    const [detailTugas, setDetailTugas] = useState([])
    const [fileTugas, setFileTugas] = useState("")
    const [tglAkhir, setTglAkhir] = useState("")
    const [show, setShow] = useState(false)
    const [tgl, setTgl] = useState("")
    const [kodeKelas, setKodeKelas] = useState("")
    const [Mahasiswa, setMahasiswa] = useState([])
    const location = useLocation()
    const [status, setStatus] = useState("")
    const [keyword, setKeyword] = useState("")
    const [kodePertemuan, setKodePertemuan] = useState("")
    const [detailNim, setDetailNim] = useState([])

    useEffect(() => {
        if (location.state != null) {
            setKodeJenjang(location.state.kodeJen)
            setKodeFakultas(location.state.kodeFkl)
            setKodeProdi(location.state.kodePro)
            setKodeTahun(location.state.kodeThn)
            setKodeSemester(location.state.kodeSmt)
            setIdProdi(location.state.idProdi)
        }
    }, [location])

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
        const getDosenByNip = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/dosen/getByNipy/${user.data.username}`)
                    setDetailDosen(response.data.data)
                    setPendidikan(response.data.data.pendidikans[0].nama_pendidikan)
                }
            } catch (error) {

            }
        }
        getDosenByNip()
        getDateNow()
    }, [user])

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
        getTugas()
    }, [user, kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi])

    useEffect(() => {
        getMahasiswaPerkelas()
    }, [kodeKelas, keyword])

    useEffect(() => {
        getDetailTugas()
    }, [user, kodePertemuan])

    useEffect(() => {
        getDetailNim()
    }, [detailTugas])

    useEffect(() => {
        filterMahasiswa()
    }, [detailNim, Mahasiswa])

    const getDateNow = () => {
        const d = new Date()
        setTgl(moment(d).format('YYYY-MM-D'))
    }

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

    const getTugas = async () => {
        try {
            if (user && kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester) {
                const response = await axios.get(`v1/tugas/all/${user.data.username}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setAllTugas(response.data.data)
            }
        } catch (error) {

        }
    }

    const handleShow = async (e, f, g) => {
        try {
            const response = await axios.get(`v1/tugas/getById/${e}`)
            // console.log(response.data.data)
            setIdTugas(response.data.data.id_tugas)
            setDeskripsi(response.data.data.deskripsi_tugas)
            setKodePertemuan(response.data.data.code_jadwal_pertemuan)
            setNamaTugas(response.data.data.tugas)
            setTglAkhir(response.data.data.tanggal_akhir)
            // setFileTugas(response.data.data.file_tugas)
            setStatus(f)
            setKodeKelas(g)
            setShow(true)

        } catch (error) {

        }
    }

    const getMahasiswaPerkelas = async () => {
        try {
            if (kodeKelas) {
                const response = await axios.get(`v1/tugas/getMhsByKelas/${kodeKelas}?search=${keyword}`)
                setMahasiswa(response.data.data)
                console.log(response.data.data)
            }
        } catch (error) {

        }
    }

    const getDetailTugas = async () => {
        try {
            if (user && kodePertemuan) {
                const response = await axios.get(`v1/detailTugas/alldosen/${user.data.username}/${kodePertemuan}`)
                setDetailTugas(response.data.data)
                console.log(response.data.data);
            }
        } catch (error) {

        }
    }

    const getDetailNim = () => {
        var i = detailTugas.map(item => (
            item.nim
        ))
        setDetailNim(i)
        // console.log(i);
    }

    const filterMahasiswa = () => {
        var b = Mahasiswa.filter((item) =>
            detailNim.includes(item.nim)
        )

        // console.log(b);
    }

    const loadTugas = (e) => {
        const file = e.target.files[0]
        setFileTugas(file)
    }

    const handleClose = () => {
        setDeskripsi("")
        setTglAkhir("")
        setNamaTugas("")
        setFileTugas("")
        setShow(false)
    }

    const simpanTugas = async (e) => {
        e.preventDefault()
        if (deskripsi == "") {
            Swal.fire({
                title: 'Deskripsi tidak boleh kosong',
                icon: 'error'
            })
        } else if (namaTugas == "") {
            Swal.fire({
                title: 'Judul tugas tidak boleh kosong',
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
            formData.append('deskripsi_tugas', deskripsi)
            formData.append('tugas', namaTugas)
            formData.append('file_tugas', fileTugas)
            formData.append('tanggal_akhir', tglAkhir)
            try {
                await axios.put(`v1/tugas/update/${idTugas}`, formData, {
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
                        getTugas()
                    });
                })
            } catch (error) {

            }
        }
    }

    const selesaikan = (tugasId) => {
        try {
            axios.put(
                `v1/tugas/updateStatus/${tugasId}`
            )
        } catch (error) {

        }
    }

    const hapus = (tugasId) => {
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
                    axios.delete(
                        `v1/tugas/delete/${tugasId}`
                    ).then((response) => {
                        Swal.fire({
                            title: 'Terhapus',
                            icon: "success"
                        }).then(() => {
                            getTugas()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <Layout>
            <title>Tugas Kuliah</title>
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
                                // backdrop="static"
                                keyboard={false}
                                size='lg'
                                centered
                            >
                                <Modal.Header>
                                    {/* <Modal.Title></Modal.Title> */}
                                    <div className='flex gap-2 mx-auto'>
                                        <button className={`btn btn-sm ${status == 'tugas' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setStatus('tugas')}>Edit Tugas</button>
                                        <button className={`btn btn-sm ${status == 'mhs' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setStatus('mhs')}>Edit Mahasiswa</button>
                                    </div>
                                </Modal.Header>
                                <Modal.Body>
                                    {status == 'tugas' ?
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
                                        </form> :
                                        <Row>
                                            <Col>
                                                <div className='table-responsive'>
                                                    <Table>

                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                </Modal.Body>
                            </Modal>
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Tugas Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Card className='shadow mb-3'>
                                                <Card.Body className='py-3'>
                                                    <Row className='py-4 ps-3 shadow-sm rounded' style={{ background: '#E9EAE1' }}>
                                                        <Col lg="6">
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
                                                                <Col className='py-0'>
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
                                                                <Col className='py-0'>
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
                                                                <Col className='py-0'>
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
                                            <Card className='shadow'>
                                                <Card.Body className='p-3'>
                                                    <Row>
                                                        <Col lg='12'>
                                                            {AllTugas.length > 0 ? AllTugas.map((item) => (
                                                                <Card className='shadow mb-2' key={item.id_tugas}>
                                                                    <Card.Body className='py-3'>
                                                                        <Row className='border pt-2'>
                                                                            <Col lg="6">
                                                                                <Row className='mb-2'>
                                                                                    <Col lg="3" md="3" sm="5" xs="5">
                                                                                        <Card.Text className='text-capitalize'>Matakuliah</Card.Text>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <Card.Text className='text-capitalize'>: {item.jadwalPertemuans[0].jadwalKuliahs[0].sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</Card.Text>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                            <Col lg="6">
                                                                                <Row className='mb-2'>
                                                                                    <Col lg="3" md="3" sm="5" xs="5">
                                                                                        <Card.Text className='text-capitalize'>Pertemuan Ke</Card.Text>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <Card.Text className='text-capitalize'>: {item.jadwalPertemuans[0].pertemuan}</Card.Text>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col className='px-0'>
                                                                                <div className="table-responsive">
                                                                                    <Table>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td className='py-2 border'>Judul Tugas</td>
                                                                                                <td className='py-2 border'>Terakhir Pengumpulan</td>
                                                                                                <td className='py-2 border'>Tanggal Pertemuan</td>
                                                                                                <td className='py-2 border'>Status Tugas</td>
                                                                                                <td className='py-2 px-1 border' rowSpan={2} align='center'>
                                                                                                    <div>
                                                                                                        {/* <button className='btn btn-sm btn-primary mr-1'></button> */}
                                                                                                        <Link to='/deskripsi' state={{
                                                                                                            idTugas: item.id_tugas,
                                                                                                            kodeThn: kodeTahun,
                                                                                                            kodeSmt: kodeSemester,
                                                                                                            kodeJen: kodeJenjang,
                                                                                                            kodeFkl: kodeFakultas,
                                                                                                            kodePro: kodeProdi,
                                                                                                            idProdi: idProdi,
                                                                                                            kodeprt: item.code_jadwal_pertemuan
                                                                                                        }} className='btn btn-sm btn-info'>Detail</Link>
                                                                                                        {item.status == 'belum' ?
                                                                                                            <button onClick={() => handleShow(item.id_tugas, 'tugas', item.jadwalPertemuans[0].jadwalKuliahs[0].code_kelas)} className='btn btn-sm btn-warning ml-1'>Edit</button>
                                                                                                            :
                                                                                                            ""
                                                                                                        }
                                                                                                        {item.jadwalPertemuans[0].tanggal_pertemuan == tgl ?
                                                                                                            selesaikan(item.id_tugas) : ""
                                                                                                        }
                                                                                                        {item.status == 'belum' ?
                                                                                                            <button onClick={() => hapus(item.id_tugas)} className='btn btn-sm btn-danger ml-1'>Hapus</button>
                                                                                                            : ""
                                                                                                        }
                                                                                                    </div>

                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td className='py-2 border'>{item.tugas}</td>
                                                                                                <td className='py-2 border'>{moment(item.tanggal_akhir).format('DD MMMM YYYY')}</td>
                                                                                                <td className='py-2 border'>{moment(item.jadwalPertemuans[0].tanggal_pertemuan).format('DD MMMM YYYY')}</td>
                                                                                                <td className='py-2 border'>
                                                                                                    {
                                                                                                        item.status == 'belum' ?
                                                                                                            <span className="inline-block whitespace-nowrap rounded-pill bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum Selesai</span>
                                                                                                            :
                                                                                                            <span className="inline-block whitespace-nowrap rounded-pill bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Sudah Selesai</span>
                                                                                                    }
                                                                                                </td>
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
                                                                </div>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default ListTugas