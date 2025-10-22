import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { getMe } from "../../../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import ReactPaginate from 'react-paginate'

const MakulDiampu = () => {
    const [username, setUsername] = useState("")
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [idProdi, setIdProdi] = useState("")
    const [MataKuliah, setMataKuliah] = useState([])
    const location = useLocation()

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
        getUserDosen()
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
        console.log(location.state)
        if (location.state != null) {
            setKodeJenjang(location.state.codeJnj)
            setKodeFakultas(location.state.codeFks)
            setKodeProdi(location.state.codePrd)
            setKodeTahun(location.state.codeThn)
            setKodeSemester(location.state.codeSmt)
            setIdProdi(location.state.idProdi)
        }
    }, [location])

    useEffect(() => {
        getMakulByDosen()
    }, [username, kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi])

    const getUserDosen = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/pembimbingAkademik/verifikasiDosenPembimbing/${user.data.username}`)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeProdi(response.data.data.code_prodi)
            }
        } catch (error) {

        }
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

    const getMakulByDosen = async () => {
        try {
            if (username && kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester) {
                const response = await axios.get(`v1/rps/getMakulByDosen/${username}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setMataKuliah(response.data.data)
                console.log('hasil', response.data.data)
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>RPS</title>
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
                                <h2 className='fs-4 font-bold'>RPS</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Row>
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
                                </Col>
                            </Row>
                            <div className='row mt-3'>
                                <Col>
                                    <Card>
                                        <Card.Body className='p-3'>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3 text-center' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Kode Mata Kuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Mata Kuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {MataKuliah.map((item, index) => (
                                                            <tr key={index} className='border'>
                                                                <td className='py-3 text-center'>{index + 1}</td>
                                                                <td className='py-3'>{item.code_mata_kuliah}</td>
                                                                <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].jenis_mata_kuliah}</td>
                                                                <td className='py-3'>
                                                                    <Link to="/uploadRps"
                                                                        state={{
                                                                            codeMakul: item.code_mata_kuliah,
                                                                            codeThn: item.code_tahun_ajaran,
                                                                            codeSmt: item.code_semester,
                                                                            codeJnj: item.code_jenjang_pendidikan,
                                                                            codeFks: item.code_fakultas,
                                                                            codePrd: item.code_prodi,
                                                                            idProdi: idProdi,
                                                                            nipy: item.dosen_pengajar,
                                                                            makul: item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah
                                                                        }}
                                                                        className='btn btn-sm btn-info me-1'>Detail</Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </div>
                        </div >
                    }
                </>
            }
        </Layout>
    )
}

export default MakulDiampu