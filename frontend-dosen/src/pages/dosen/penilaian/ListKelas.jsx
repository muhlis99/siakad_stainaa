import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { Circles } from "react-loader-spinner"

const ListKelas = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [idProdi, setIdProdi] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [username, setUsername] = useState("")
    const [detailDosen, setDetailDosen] = useState([])
    const [pendidikan, setPendidikan] = useState("")
    const [MataKuliah, setMataKuliah] = useState([])
    const [kodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [load, setLoad] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.state != null) {
            setKodeJenjang(location.state.kodeJen)
            setKodeTahun(location.state.kodeThn)
            setKodeSemester(location.state.kodeSmt)
            setKodeFakultas(location.state.kodeFk)
            setKodeProdi(location.state.kodeProd)
        }
    }, [location])

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
        dispatch(getMe())
    }, [dispatch])

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
        getMataKuliah()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester, username])

    useEffect(() => {
        getKodeMakul()
    }, [MataKuliah])

    useEffect(() => {
        getDataKelas()
    }, [kodeMakul, kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester])

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

    const getMataKuliah = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester) {
                const response = await axios.get(`v1/jadwalKuliah/jadwalKuliahDosen/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}`)
                setMataKuliah(response.data.data)
            }
        } catch (error) {

        }
    }

    const getKodeMakul = () => {
        var i = MataKuliah.map(item => (
            item.code_mata_kuliah
        ))
        setKodeMakul(i)
    }

    const getDataKelas = async () => {
        let kelass = []
        let promises = []
        for (let i = 0; i < kodeMakul.length; i++) {
            const t = await axios.get(`v1/kelasKuliah/getKelasByMakul/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${kodeMakul[i]}`).then(response => {
                kelass.push(response.data.data)
            })
            promises.push(t)
        }
        Promise.all(promises).then(() => setDataKelas(kelass))
    }

    return (
        <Layout>
            <title>Penilaian</title>
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
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Penilaian</h2>
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
                                    <Card className="shadow mt-3">
                                        <Card.Body className="px-3">
                                            <Row>
                                                <Col>
                                                    <div className="table-responsive">
                                                        <Table hover>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>#</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Kode Mata Kuliah</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Mata Kuliah</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Kelas</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jumlah Mahasiswa</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Kapasitas</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {MataKuliah.length > 0 ? MataKuliah.map((mkl, index) => (
                                                                    DataKelas.length != 0 ? DataKelas[index].map((item) => (
                                                                        <tr key={item.id_kelas} className='border'>
                                                                            <td className='py-2'>{index + 1}</td>
                                                                            <td className='py-2'>{item.code_mata_kuliah}</td>
                                                                            <td className='py-2'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                                            <td className='py-2'>{item.nama_kelas}</td>
                                                                            <td className='py-2'>{item.jumlahMhs} Mahasiswa</td>
                                                                            <td className='py-2'>{item.kapasitas} Mahasiswa</td>
                                                                            <td className='py-2'>
                                                                                <Link to='/detailnilai' state={{ kodeMk: item.code_mata_kuliah, idKelas: item.id_kelas, kodeKls: item.code, kodeThn: kodeTahun, kodeSmt: kodeSemester, kodeJen: kodeJenjang, kodeFk: kodeFakultas, kodeProd: kodeProdi }} className='bg-[#17A2B8] py-2 px-2 rounded text-decoration-none text-white inline-flex items-center'>Setting</Link>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                        : ""
                                                                )) :
                                                                    <tr className='border'>
                                                                        <td colSpan={7} align='center'>
                                                                            <Image src={dataBlank} thumbnail width={150} />
                                                                            <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                        </td>
                                                                    </tr>
                                                                }
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

export default ListKelas