import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/watch.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Circles } from 'react-loader-spinner'

const ListMakul = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [detailDosen, setDetailDosen] = useState([])
    const [mataKuliah, setMataKuliah] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [idProdi, setIdProdi] = useState("")
    const [pendidikan, setPendidikan] = useState("")
    const location = useLocation()

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
        if (location.state != null) {
            setKodeJenjang(location.state.kodeJen)
            setIdProdi(location.state.idProdi)
            setKodeFakultas(location.state.kodeFkl)
            setKodeProdi(location.state.kodePro)
            setKodeTahun(location.state.kodeThn)
            setKodeSemester(location.state.kodeSmt)
        }
    }, [location])

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => { console.log(location.state) }, [location])

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
        getMakulYangDiampu()
    }, [username, kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi])

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

    const getMakulYangDiampu = async () => {
        try {
            if (username && kodeTahun && kodeSemester && kodeJenjang && kodeFakultas && kodeProdi) {
                const response = await axios.get(`v1/presensiMhs/getMakulByDosen/${username}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setMataKuliah(response.data.data)
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
                                <h2 className='fs-4 font-bold'>Presensi</h2>
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
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Matakuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis Matakuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>SKS</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status</th>
                                                            <th className='fw-bold py-3 text-center' style={{ background: '#E9EAE1' }}><span>Aksi</span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {mataKuliah.length == 0 ?
                                                            <tr className='border'>
                                                                <td colSpan={6} align='center'>
                                                                    <Image src={dataBlank} width={150} />
                                                                    <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                </td>
                                                            </tr>
                                                            :
                                                            mataKuliah.map((item, index) => (
                                                                <tr key={item.id_jadwal_kuliah} className='border'>
                                                                    <td className='py-2'>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td className='py-2'>
                                                                        {item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}
                                                                    </td>
                                                                    <td className='py-2'>
                                                                        {item.sebaranMataKuliahs[0].mataKuliahs[0].jenis_mata_kuliah}
                                                                    </td>
                                                                    <td className='py-2'>
                                                                        {item.sebaranMataKuliahs[0].mataKuliahs[0].sks} SKS
                                                                    </td>
                                                                    <td className='py-2'>
                                                                        <span className='capitalize'>{item.sebaranMataKuliahs[0].status_makul}</span>
                                                                    </td>
                                                                    <td className='py-2' align='center'>
                                                                        <Link to="/presensi/pertemuan" state={
                                                                            {
                                                                                kodeThn: kodeTahun,
                                                                                kodeSmt: kodeSemester,
                                                                                kodeJen: kodeJenjang,
                                                                                kodeFkl: kodeFakultas,
                                                                                kodePro: kodeProdi,
                                                                                idProdi: idProdi,
                                                                                kodeJadwal: item.code_jadwal_kuliah,
                                                                                mataKuliah: item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah,
                                                                                jenisMk: item.sebaranMataKuliahs[0].mataKuliahs[0].jenis_mata_kuliah,
                                                                                bobot: item.sebaranMataKuliahs[0].status_bobot_makul,
                                                                                sks: item.sebaranMataKuliahs[0].mataKuliahs[0].sks,
                                                                                kodeMk: item.code_mata_kuliah
                                                                            }
                                                                        } className='bg-[#28A745] py-2 px-2 rounded text-white inline-flex items-center no-underline'>
                                                                            Absen
                                                                        </Link>
                                                                        <Link to="/presensi/rekap"
                                                                            state={{
                                                                                kodeThn: kodeTahun,
                                                                                kodeSmt: kodeSemester,
                                                                                kodeJen: kodeJenjang,
                                                                                kodeFkl: kodeFakultas,
                                                                                kodePro: kodeProdi,
                                                                                idProdi: idProdi,
                                                                                kodeJadwal: item.code_jadwal_kuliah,
                                                                                mataKuliah: item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah,
                                                                                jenisMk: item.sebaranMataKuliahs[0].mataKuliahs[0].jenis_mata_kuliah,
                                                                                bobot: item.sebaranMataKuliahs[0].status_bobot_makul,
                                                                                sks: item.sebaranMataKuliahs[0].mataKuliahs[0].sks,
                                                                                kodeMk: item.code_mata_kuliah
                                                                            }}
                                                                            className='bg-[#17A2B8] ml-1 py-2 px-2 rounded text-white inline-flex items-center no-underline'>
                                                                            Rekap
                                                                        </Link>
                                                                        <Link to="/presensi/kehadiran"
                                                                            state={{
                                                                                kodeThn: kodeTahun,
                                                                                kodeSmt: kodeSemester,
                                                                                kodeJen: kodeJenjang,
                                                                                kodeFkl: kodeFakultas,
                                                                                kodePro: kodeProdi,
                                                                                idProdi: idProdi,
                                                                                kodeJadwal: item.code_jadwal_kuliah,
                                                                                mataKuliah: item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah,
                                                                                jenisMk: item.sebaranMataKuliahs[0].mataKuliahs[0].jenis_mata_kuliah,
                                                                                bobot: item.sebaranMataKuliahs[0].status_bobot_makul,
                                                                                sks: item.sebaranMataKuliahs[0].mataKuliahs[0].sks,
                                                                                kodeMk: item.code_mata_kuliah
                                                                            }}
                                                                            className='bg-[#007BFF] ml-1 py-2 px-2 rounded text-white inline-flex items-center no-underline'>
                                                                            Kehadiran
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

export default ListMakul