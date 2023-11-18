import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import dataBlank from "../assets/images/noData.svg"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { FaFileContract } from 'react-icons/fa'
import { FaGraduationCap } from "react-icons/fa6"

const Dashboard = () => {
    const [Prodi, SetProdi] = useState([])
    const [Jadwal, setJadwal] = useState([])
    const [ListNilai, setListNilai] = useState([])
    const [Tahun, setTahun] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [level, setLevel] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLevel(user.data.role)
        }
        getTahunAjaran()
    }, [user])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getTotalSKSProdi = async () => {
            try {
                if (level == 'mahasiswa') {
                    const response = await axios.get(`v1/home/totalSksDanProdi/${user.data.username}`)
                    SetProdi(response.data.data)
                }
            } catch (error) {
            }
        }
        getTotalSKSProdi()
    }, [user, level])

    useEffect(() => {
        const getJadwalNow = async () => {
            try {
                if (level == 'mahasiswa') {
                    const response = await axios.get(`v1/home/jadwalKuliahNowMahasiswa/${user.data.username}`)
                    setJadwal(response.data.data)
                }
            } catch (error) {

            }
        }
        getJadwalNow()
    }, [user, level])

    useEffect(() => {
        getKategoriNilai()
    }, [page, keyword, kodeTahun])

    const getKategoriNilai = async () => {
        const response = await axios.get(`v1/kategoriNilai/all?page=${page}&search=${keyword}&codeThnAjr=${kodeTahun}`)
        setListNilai(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }


    return (
        <Layout>
            {isError ? <Navigate to="/login" replace /> : <div className="content-wrapper">
                <div className="page-header">
                    <h2 className='fs-4 fw-semibold' >Dashboard</h2>
                </div>
                {level == 'mahasiswa' ?
                    <>
                        <Row>
                            <Col>
                                <div className="lg:flex flex-row gap-3">
                                    <div className="basis-1/2 bg-white mb-2 rounded-lg shadow-md p-3">
                                        <h3 className='text-[#5E7C60]'>Hai, Selamat Datang</h3>
                                        <p className='text-base'>
                                            Selamat bergabung menjadi mahasiswa, aplikasi ini membantu anda dalam proses perkuliahan anda meliputi Rencana Studi, Jadwal Kuliah, Hasil Studi dan lain-lain.
                                        </p>
                                    </div>
                                    <div className="basis-1/4 mb-2 bg-white rounded-lg shadow-md flex gap-2 p-3 items-center">
                                        <div>
                                            <div className='h-12 w-12 bg-[#7DE274] rounded-full text-white flex justify-center items-center'>
                                                <p className='h2'><FaGraduationCap /></p>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className='font-bold'>{Prodi.prodi}</h6>
                                            <span>Program Studi</span>
                                        </div>
                                    </div>
                                    <div className="basis-1/4 mb-2 bg-white rounded-lg shadow-md flex gap-2 p-3 items-center">
                                        <div>
                                            <div className='h-12 w-12 bg-[#74C5FF] rounded-full text-white flex justify-center items-center'>
                                                <p className='h4'><FaFileContract /></p>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className='font-bold'>{Prodi.totalSks}</h5>
                                            <span>Total SKS</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col lg="12" className='p-1'>
                                <Card className='shadow-sm'>
                                    <Card.Header className='fw-bold' style={{ color: '#5E7C60' }}>Jadwal Kuliah Hari ini</Card.Header>
                                    <Card.Body className='p-3'>
                                        <div className="table-responsive mt-1">
                                            <Table striped>
                                                <thead>
                                                    <tr style={{ background: '#E9EAE1' }}>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>#</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Jam</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Jenis Pertemuan</th>
                                                        <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Pembelejaran</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Jadwal.length != 0 ?
                                                        Jadwal.map((item, index) => (
                                                            <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                <th scope='row' className='py-2'>{index + 1}</th>
                                                                <td className='py-2'>{item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai}</td>
                                                                <td className='py-2'>{item.jadwalKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                <td className='py-2 text-uppercase'>{item.jenis_pertemuan}</td>
                                                                <td className='py-2'>{item.metode_pembelajaran}</td>
                                                            </tr>
                                                        )) :
                                                        <tr className='border'>
                                                            <td colSpan={5} align='center'>
                                                                <Image src={dataBlank} thumbnail width={150} />
                                                                <p className='fw-bold text-muted'>Tidak Ada Jadwal Hari Ini</p>
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </>
                    :
                    <Row>
                        <Col lg="6">
                            <div className="bg-white mb-2 rounded-lg shadow-md p-3">
                                <h3 className='text-[#5E7C60]'>Hai, Selamat Datang</h3>
                                <p className='text-base'>
                                    Aplikasi ini membantu anda dalam mengelola Perkuliahan meliputi Pengumuman kampus, Rencana Studi Mahasiswa, Jadwal Kuliah, Pengajuan Studi dan lain-lain.
                                </p>
                            </div>
                        </Col>
                        <Col lg="6">
                            <Card className='shadow-md'>
                                <Card.Header>
                                    <div className='w-50'>
                                        <select className='form-select form-select-sm' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                            <option>Semua</option>
                                            {Tahun.map((item) => (
                                                <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Card.Header>
                                <Card.Body className="px-2">
                                    <div className='table-responsive'>
                                        <Table hover>
                                            <thead>
                                                <tr className='border'>
                                                    <th className='py-2 fw-bold text-[9px]' style={{ background: '#D5D6C6' }}>No</th>
                                                    <th className='py-2 fw-bold text-[9px]' style={{ background: '#D5D6C6' }}>Periode</th>
                                                    <th className='py-2 fw-bold text-[9px]' style={{ background: '#D5D6C6' }}>Nilai Huruf</th>
                                                    <th className='py-2 fw-bold text-[9px]' style={{ background: '#D5D6C6' }}>Nilai Angka</th>
                                                    <th className='py-2 fw-bold text-[9px]' style={{ background: '#D5D6C6' }}>Kategori</th>
                                                    <th className='py-2 fw-bold text-[9px]' style={{ background: '#D5D6C6' }}>Keterangan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ListNilai.length > 0 ? ListNilai.map((item, index) => (
                                                    <tr key={item.id_kategori_nilai} className='border'>
                                                        <th scope='row' className='py-2 text-[9px]'>{index + 1}</th>
                                                        <td className='py-2 text-[9px]'>{item.tahunAjarans[0].tahun_ajaran}</td>
                                                        <td className='py-2 text-[9px]'>{item.nilai_huruf}</td>
                                                        <td className='py-2 text-[9px]'>{item.nilai_bawah + ' - ' + item.nilai_atas}</td>
                                                        <td className='py-2 text-[9px]'>{item.kategori}</td>
                                                        <td className='py-2 text-[9px]'>{item.keterangan}</td>
                                                    </tr>
                                                )) :
                                                    <tr className='border'>
                                                        <td className='py-2' colSpan={6} align='center'>
                                                            <Image src={dataBlank} thumbnail width={150} />
                                                            <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
            </div>}

        </Layout >
    )
}

export default Dashboard