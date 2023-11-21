import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'

const ListKelas = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [username, setUsername] = useState("")
    const [MataKuliah, setMataKuliah] = useState([])
    const [kodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])

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
        getMataKuliah()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester, username])

    useEffect(() => {
        getKodeMakul()
    }, [MataKuliah])

    useEffect(() => {
        getDataKelas()
    }, [kodeMakul, kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester])

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
            {isError ? <Navigate to="/login" />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">Penilaian</h3>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body className='p-3'>
                                    <Row>
                                        <Col>
                                            <div className="grid lg:grid-cols-5 gap-2">
                                                <div>
                                                    <select className="form-select" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                                        <option value="">Jenjang Pendidikan</option>
                                                        {Jenjang.map((item) => (
                                                            <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select className="form-select" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                                        <option value="">Fakultas</option>
                                                        {Fakultas.map((item) => (
                                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select className="form-select" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                                        <option value="">Prodi</option>
                                                        {Prodi.map((item) => (
                                                            <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select className="form-select" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                        <option value="">Periode</option>
                                                        {Tahun.map((item) => (
                                                            <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select className="form-select" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                                        <option value="">Semester</option>
                                                        {Semester.map((item) => (
                                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col>
                                            <div className="table-responsive">
                                                <Table hover>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>#</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Kode Mata Kuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Kelas</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Jumlah Mahasiswa</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Kapasitas</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            MataKuliah.map((mkl, index) => (
                                                                DataKelas.length != 0 ? DataKelas[index].map((item) => (
                                                                    <tr key={item.id_kelas} className='border'>
                                                                        <th scope='row' className='py-2'>{index + 1}</th>
                                                                        <td className='py-2'>{item.code_mata_kuliah}</td>
                                                                        <td className='py-2'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                                        <td className='py-2'>{item.nama_kelas}</td>
                                                                        <td className='py-2'>{item.jumlahMhs} Mahasiswa</td>
                                                                        <td className='py-2'>{item.kapasitas} Mahasiswa</td>
                                                                        <td className='py-2'>
                                                                            <Link to='/detailnilai' state={{ kodeMk: item.code_mata_kuliah, idKelas: item.id_kelas, kodeKls: item.code }} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex items-center'><FaSearch /></Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                                    : ""
                                                            ))

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
        </Layout>
    )
}

export default ListKelas