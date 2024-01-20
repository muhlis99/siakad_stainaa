import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import dataBlank from "../../../assets/images/watch.svg"
import { Link, Navigate, useLocation } from "react-router-dom"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from "moment"
import { FaReply } from 'react-icons/fa'

const Deskripsi = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const [Tugas, setTugas] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const location = useLocation()

    useEffect(() => {
        console.log(location.state)
    }, [location])

    useEffect(() => {
        const getDetailTugas = async () => {
            try {
                const response = await axios.get(`v1/tugas/getById/${location.state.idTugas}`)
                // console.log(response.data.data)
                setTugas(response.data.data)
            } catch (error) {

            }
        }
        getDetailTugas()
    }, [location])

    useEffect(() => {
        getDataMahasiswa()
    }, [user, location])

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const getDataMahasiswa = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/detailTugas/alldosen/${user.data.username}/${location.state.kodeprt}`)
                setMahasiswa(response.data.data);
            }
        } catch (error) {

        }
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
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Tugas Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Body className='py-3'>
                                            <Row className='shadow-sm py-3 rounded' style={{ background: '#E9EAE1' }}>
                                                <Col lg="7">
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Judul Tugas</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a> {Tugas.tugas}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>Deskripsi Tugas</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{Tugas.deskripsi_tugas}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="5">
                                                    <Row className='mb-2'>
                                                        <Col lg="6">
                                                            <a>Batas Pengumpulan</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{moment(Tugas.tanggal_akhir).format('DD MMMM YYYY')}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="6">
                                                            <a>Lampiran Tugas</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{Tugas.file_tugas ? 'Lampiran ada' : 'Lampiran tidak ada'}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card className='shadow mt-3'>
                                        <Card.Body className='p-3'>
                                            <Row className='mb-3'>
                                                <Col>
                                                    <Link to='/tugas' state={{
                                                        kodeJen: location.state.kodeJen,
                                                        kodeFkl: location.state.kodeFkl,
                                                        kodePro: location.state.kodePro,
                                                        kodeThn: location.state.kodeThn,
                                                        kodeSmt: location.state.kodeSmt,
                                                        idProdi: location.state.idProdi,
                                                        kodeprt: location.state.kodeprt
                                                    }} className='bg-[#DC3545] py-1 px-2 rounded no-underline text-white inline-flex items-center gap-1'><FaReply /> Kembali</Link>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className='table-responsive'>
                                                        <Table>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>NO</th>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>NIM</th>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Nama</th>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Tanggal Pengumpulan</th>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Prodi</th>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Status</th>
                                                                    <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Aksi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Mahasiswa.length == '0' ?
                                                                    <tr className='border'>
                                                                        <td className='py-2 px-2 text-capitalize' align='center' colSpan={7}>
                                                                            <Image src={dataBlank} className='mt-4 ' width={150} />
                                                                            <p>Mahasiswa belum mengumpulkan tugas</p>
                                                                        </td>
                                                                    </tr>
                                                                    :

                                                                    Mahasiswa.map((item, index) => (
                                                                        <tr key={index} className='border'>
                                                                            <td className='py-2 px-2 text-capitalize'>{index + 1}</td>
                                                                            <td className='py-2 px-2 text-capitalize'>{item.nim}</td>
                                                                            <td className='py-2 px-2 text-capitalize'>{item.mahasiswas[0].nama}</td>
                                                                            <td className='py-2 px-2 text-capitalize'>{item.tanggal_pengumpulan == '' ? '-' : moment(item.tanggal_pengumpulan).format('DD MMMM YYYY')}</td>
                                                                            <td className='py-2 px-2 text-capitalize'>{item.mahasiswas[0].prodis[0].nama_prodi}</td>
                                                                            <td className='py-2 px-2 text-capitalize'>
                                                                                {
                                                                                    item.status == 'terkumpul' ?
                                                                                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Selesai</span>
                                                                                        :
                                                                                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum</span>
                                                                                }
                                                                            </td>
                                                                            <td className='py-2 px-2 text-capitalize'>
                                                                                <Link to="/detailTugas" state={{
                                                                                    kodeTgs: Tugas.code_tugas,
                                                                                    nim: item.nim,
                                                                                    idTugas: location.state.idTugas,
                                                                                    kodeJen: location.state.kodeJen,
                                                                                    kodeFkl: location.state.kodeFkl,
                                                                                    kodePro: location.state.kodePro,
                                                                                    kodeThn: location.state.kodeThn,
                                                                                    kodeSmt: location.state.kodeSmt,
                                                                                    idProdi: location.state.idProdi,
                                                                                    kodeprt: location.state.kodeprt
                                                                                }} className={`btn btn-sm btn-info ${item.status == 'terkumpul' ? '' : 'disabled'}`}>Detail</Link>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
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

export default Deskripsi