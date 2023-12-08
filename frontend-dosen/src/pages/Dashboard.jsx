import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { LogOut, reset } from "../features/authSlice"
import dataBlank from "../assets/images/noData.svg"
import { Navigate, useNavigate } from "react-router-dom"
import axios from 'axios'
import { FaFileContract } from 'react-icons/fa'
import { FaGraduationCap } from "react-icons/fa6"
import { Circles } from "react-loader-spinner"
import moment from "moment"

const Dashboard = () => {
    const [Prodi, SetProdi] = useState([])
    const [Jadwal, setJadwal] = useState([])
    const [ListNilai, setListNilai] = useState([])
    const [Tahun, setTahun] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [nama, setNama] = useState("")
    const [keyword, setKeyword] = useState("")
    const [level, setLevel] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        const getDataSession = async () => {
            try {
                if (user) {
                    if (user.data.role == 'mahasiswa') {
                        const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                        setNama(response.data.data.nama)
                    } else {
                        const response = await axios.get(`v1/dosen/getByNipy/${user.data.username}`)
                        setNama(response.data.data.nama)
                    }
                }
            } catch (error) {

            }
        }
        getDataSession()
    }, [user])

    useEffect(() => {
        const logOut = () => {
            dispatch(LogOut())
            dispatch(reset())
            navigate("/login")
        }
        if (user) {
            if (user.data.role == 'admin') {
                logOut()
            }
        }
    }, [user])

    useEffect(() => {
        if (user) {
            setLevel(user.data.role)
        }
    }, [user])

    useEffect(() => {
        getTahunAjaran()
    }, [])

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

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getKategoriNilai = async () => {
        try {
            if (kodeTahun) {
                await axios.get(
                    `v1/kategoriNilai/all?page=${page}&search=${keyword}&codeThnAjr=${kodeTahun}`
                ).then((response) => {
                    response.data.data.sort((a, b) =>
                        a.id_kategori_nilai > b.id_kategori_nilai ? 1 : -1
                    )
                    setListNilai(response.data.data)
                })
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Dashboard</title>
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
                                <h2 className='fs-4 font-bold' >Dashboard</h2>
                            </div>
                            {level == 'mahasiswa' ?
                                <>
                                    <Row>
                                        <Col>
                                            <div className="lg:flex flex-row gap-3">
                                                <div className="basis-1/2 bg-white mb-2 rounded-lg shadow-md p-3">
                                                    <h3 className='text-[#5E7C60] text-[20px]'>Hai {nama}, Selamat Datang</h3>
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
                                        <Col lg="12">
                                            <Card className='shadow-sm'>
                                                <Card.Header className='fw-bold'>
                                                    <Card.Title className='mt-2' style={{ color: '#5E7C60' }}>
                                                        Jadwal Kuliah Hari ini
                                                    </Card.Title>
                                                </Card.Header>
                                                <Card.Body className='p-3'>
                                                    <div className="table-responsive">
                                                        <Table>
                                                            <thead>
                                                                <tr className='border' style={{ background: '#E9EAE1' }}>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>No</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Hari</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Tanggal</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Jam</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Mata Kuliah</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Pembelejaran</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Ruang</span></th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}><span className='text-[#5E7C60]'>Dosen</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Jadwal.length != 0 ?
                                                                    Jadwal.map((item, index) => (
                                                                        <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                            <th scope='row' className='py-3'><span className='text-[#5E7C60]'>{index + 1}</span></th>
                                                                            <td className='py-3'><span className='text-[#5E7C60]'>{item.jadwalKuliahs[0].hari}</span></td>
                                                                            <td className='py-3'><span className='text-[#5E7C60]'>{moment(item.tanggal_pertemuan).format('DD MMMM YYYY')}</span></td>
                                                                            <td className='py-3'><span className='text-[#5E7C60]'>{item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai}</span></td>
                                                                            <td className='py-3'><span className='text-[#5E7C60]'>{item.jadwalKuliahs[0].sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</span></td>
                                                                            <td className='py-3 text-capitalize'><span className='text-[#5E7C60]'>{item.metode_pembelajaran}</span></td>
                                                                            <td className='py-3'><span className='text-[#5E7C60]'>{item.jadwalKuliahs[0].ruangs[0].nama_ruang}</span></td>
                                                                            <td className='py-3'><span className='text-[#5E7C60]'>{item.jadwalKuliahs[0].dosenPengajar[0].nama == '' ? '-' : item.jadwalKuliahs[0].dosenPengajar[0].nama}</span></td>
                                                                        </tr>
                                                                    )) :
                                                                    <tr className='border'>
                                                                        <td colSpan={8} align='center'>
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
                                <>
                                    <Row className='justify-content-center'>
                                        <Col lg="8">
                                            <div className="bg-white mb-2 rounded-lg shadow-md p-3">
                                                <h3 className='text-[#5E7C60]'>Hai {nama}, Selamat Datang</h3>
                                                <p className='text-base'>
                                                    Aplikasi ini membantu anda dalam mengelola Perkuliahan meliputi Pengumuman kampus, Rencana Studi Mahasiswa, Jadwal Kuliah, Pengajuan Studi dan lain-lain.
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <Col lg="8">
                                            <Card className='shadow-md'>
                                                <Card.Body className="px-2">
                                                    <Row className='mb-2'>
                                                        <Col className='flex justify-center'>
                                                            <div>
                                                                <select className='form-select form-select-sm' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                                    {Tahun.map((item) => (
                                                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className='table-responsive'>
                                                        <Table hover>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='py-2 fw-bold text-center border' rowSpan={2} style={{ background: '#D5D6C6' }}><span>No</span></th>
                                                                    <th className='py-2 fw-bold text-center border' rowSpan={2} style={{ background: '#D5D6C6' }}><span>Periode</span></th>
                                                                    <th className='py-2 fw-bold text-center border' colSpan={2} style={{ background: '#D5D6C6' }}><span>Nilai</span></th>
                                                                    <th className='py-2 fw-bold text-center border' rowSpan={2} style={{ background: '#D5D6C6' }}><span>Kategori</span></th>
                                                                    <th className='py-2 fw-bold text-center border' rowSpan={2} style={{ background: '#D5D6C6' }}><span>Ket</span></th>
                                                                </tr>
                                                                <tr className='border'>
                                                                    <th className='py-2 fw-bold text-center border' style={{ background: '#D5D6C6' }}><span>Huruf</span></th>
                                                                    <th className='py-2 fw-bold text-center border' style={{ background: '#D5D6C6' }}><span>Angka</span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ListNilai.length > 0 ? ListNilai.map((item, index) => (
                                                                    <tr key={item.id_kategori_nilai} className='border'>
                                                                        <th scope='row' className='py-2 border text-center'><span>{index + 1}</span></th>
                                                                        <td className='py-2 border text-center' ><span>{item.tahunAjarans[0].tahun_ajaran}</span></td>
                                                                        <td className='py-2 border text-center'><span>{item.nilai_huruf}</span></td>
                                                                        <td className='py-2 border text-center'><span>{item.nilai_bawah + ' - ' + item.nilai_atas}</span></td>
                                                                        <td className='py-2 border'><span>{item.kategori}</span></td>
                                                                        <td className='py-2 border text-center'>
                                                                            {item.keterangan == 'LULUS' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">{item.keterangan}</span>
                                                                                :
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">{item.keterangan}</span>
                                                                            }
                                                                        </td>
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

                                </>
                            }
                        </div>
                    }
                </>
            }

        </Layout >
    )
}

export default Dashboard