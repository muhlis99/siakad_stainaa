import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { FaReply, FaEdit } from 'react-icons/fa'
import Swal from 'sweetalert2'

const EditNilai = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [detailKls, setDetailKls] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [jmlMhs, setJmlMhs] = useState("")
    const [inputFields, setInputFields] = useState([])
    const [tugas, setTugas] = useState([])
    const [uts, setUts] = useState([])
    const [uas, setUas] = useState([])
    const [absen, setAbsen] = useState([])
    const [nilaiAkhir, setNIlaiAkhir] = useState([])
    const [nilaiHuruf, setNilaiHuruf] = useState([])
    const [ket, setKet] = useState([])
    const [kodeNilai, setKodeNilai] = useState([])
    const [nilaiSum, setNilaiSum] = useState([])

    const min = 0
    const max = 100

    const handleFormChange = (index, event) => {
        let data = [...inputFields]
        data[index][event.target.name] = Math.max(Number(min), Math.min(Number(max), Number(event.target.value)))
        setInputFields(data)
    }

    useEffect(() => {
        getKelasById()
        // console.log(location.state)
        getMahasiswa()
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        addFields()
    }, [jmlMhs])

    useEffect(() => {
        getTugas()
        getAbsen()
        getUas()
        getUts()
    }, [inputFields])

    useEffect(() => {
        getAverage()
        getSum()
    }, [inputFields])

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir, detailKls])

    const getKelasById = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idKelas}`)
            setDetailKls(response.data.data)
        } catch (error) {

        }
    }

    const addFields = () => {
        let newfield = []
        Mahasiswa.map(item => (
            newfield.push({ tugas: parseInt(item.nilai_tugas), uts: parseInt(item.nilai_uts), uas: parseInt(item.nilai_uas), absen: parseInt(item.nilai_hadir) })
        ))
        setInputFields(newfield)
    }

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${location.state.kodeMk}&codeKls=${location.state.kodeKls}`)
            setMahasiswa(response.data.data)
            setJmlMhs(response.data.data.length)
        } catch (error) {

        }
    }

    const getTugas = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.tugas))
        ))
        setTugas(newfield)
    }

    const getUts = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.uts))
        ))
        setUts(newfield)
    }

    const getUas = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.uas))
        ))
        setUas(newfield)
    }

    const getAbsen = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.absen))
        ))
        setAbsen(newfield)
    }

    const getAverage = () => {
        const i = inputFields.map(el => {
            let tugas = parseInt(el.tugas) || 0
            let hadir = parseInt(el.absen) || 0
            let uts = parseInt(el.uts) || 0
            let uas = parseInt(el.uas) || 0
            let rataRata = (tugas + hadir + uts + uas) / 4
            return rataRata
        })
        // console.log(i);
        setNIlaiAkhir(i)
    }

    const getSum = () => {
        const i = inputFields.map(el => {
            var tugas = parseInt(el.tugas) || 0
            var hadir = parseInt(el.absen) || 0
            var uts = parseInt(el.uts) || 0
            var uas = parseInt(el.uas) || 0
            var sum = (tugas + hadir + uts + uas)
            return sum
        })
        setNilaiSum(i)
    }

    const cekNilai = async () => {
        let nilai = []
        let kode = []
        let status = []
        let promises = []
        for (let i = 0; i < nilaiAkhir.length; i++) {
            if (nilaiAkhir[i] === 0) {
                promises.push("")
            } else {
                const d = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir[i]}/${detailKls.code_tahun_ajaran}`).then(response => {
                    nilai.push(response.data.data[0].nilai_huruf)
                    kode.push(response.data.data[0].code_kategori_nilai)
                    status.push(response.data.data[0].keterangan)
                })
                promises.push(d)
            }
        }
        Promise.all(promises).then(() => setNilaiHuruf(nilai))
        Promise.all(promises).then(() => setKodeNilai(kode))
        Promise.all(promises).then(() => setKet(status))
    }

    const simpanNilai = async (e) => {
        e.preventDefault()
        try {
            await axios.put('v1/nilaiKuliah/update',
                Mahasiswa.map((item, index) => ({
                    id_nilai_kuliah: item.id_nilai_kuliah,
                    code_kategori_nilai: kodeNilai[index],
                    nilai_hadir: inputFields[index].absen,
                    nilai_tugas: inputFields[index].tugas,
                    nilai_uts: inputFields[index].uts,
                    nilai_uas: inputFields[index].uas,
                    nilai_jumlah: nilaiSum[index],
                    nilai_akhir: nilaiAkhir[index]
                }))
            ).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/detailnilai`, { state: { kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls } })
                });
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
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
                                <Card.Body>
                                    <form onSubmit={simpanNilai}>
                                        <Row className='bg-[#E9EAE1] border-l-2 border-[#5E7C60] py-3 px-3 shadow-sm rounded-r-lg'>
                                            <Col lg="6" sm="12">
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Jenjang</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.jenjangPendidikans[0].nama_jenjang_pendidikan : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.fakultas[0].nama_fakultas : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.prodis[0].nama_prodi : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Kelas</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls.nama_kelas}</Card.Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg="6" sm="12">
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.tahunAjarans[0].tahun_ajaran : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.semesters[0].semester : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-2'>
                                                    <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                        <Card.Text className='fw-bold text-uppercase'>Mata kuliah</Card.Text>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].nama_mata_kuliah : ""}</Card.Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='mt-5'>
                                            <Col className='p-0'>
                                                <div className="table-responsive">
                                                    <Table hover>
                                                        <thead>
                                                            <tr className='border'>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>#</th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>NIM</th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>Nama</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Tugas</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>UTS</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>UAS</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Absen</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Jumlah</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Nilai</th>
                                                                <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#D5D6C6' }}>Grade</th>
                                                                <th className='fw-bold py-3 text-center border-2' style={{ background: '#D5D6C6' }}>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Mahasiswa.map((mhs, index) => (
                                                                <tr key={index} className='border'>
                                                                    <th scope='row' className='py-2 border text-center'>{index + 1}</th>
                                                                    <td className='py-2 border text-capitalize' align='center'>{mhs.nim}</td>
                                                                    <td className='py-2 border text-capitalize'>{mhs.mahasiswas[0].nama}</td>
                                                                    <td className='py-2 border px-1 text-capitalize'>
                                                                        <input type="number" name='tugas' value={tugas[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' />
                                                                    </td>
                                                                    <td className='py-2 border px-1 text-capitalize'>
                                                                        <input type="number" name='uts' value={uts[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' />
                                                                    </td>
                                                                    <td className='py-2 border px-1 text-capitalize'>
                                                                        <input type="number" name='uas' value={uas[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' />
                                                                    </td>
                                                                    <td className='py-2 border px-1 text-capitalize'>
                                                                        <input type="number" name='absen' value={absen[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' />
                                                                    </td>
                                                                    <td className='py-2 border px-1 text-capitalize'>{nilaiSum[index] == 0 ? "" : nilaiSum[index]}</td>
                                                                    <td className='py-2 border px-1 text-capitalize'>{nilaiAkhir[index] == "0" ? "" : nilaiAkhir[index]}</td>
                                                                    <td className='py-2 border px-1 text-capitalize'>{nilaiHuruf[index]}</td>
                                                                    <td className='py-2 border px-1 text-capitalize'>{ket[index]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <Link to='/detailnilai' state={{ kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center no-underline'><FaReply /> &nbsp; <span>Kembali</span></Link>
                                                <button className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center float-right'><FaEdit /> &nbsp; <span>Edit</span></button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </Layout>
    )
}

export default EditNilai