import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from "moment"

const Deskripsi = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const [Tugas, setTugas] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const location = useLocation()

    // useEffect(() => {
    //     console.log(location.state)
    // }, [location])

    useEffect(() => {
        const getDetailTugas = async () => {
            try {
                const response = await axios.get(`v1/tugas/getById/${location.state.idTugas}`)
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
                const response = await axios.get(`v1/detailTugas/alldosen/${user.data.username}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}/${location.state.kodeprt}`)
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
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>NO</th>
                                                            <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Nama</th>
                                                            <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Kode Matakuliah</th>
                                                            <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Status</th>
                                                            <th className='fw-bold py-3' style={{ backgroundColor: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Mahasiswa.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.nama}</td>
                                                                <td>{item.codecode_mata_kuliah}</td>
                                                                <td>{item.checkdatatugas}</td>
                                                                <td></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>

                                            {/* <Link to="/detailTugas" className='btn btn-sm btn-info'>Detail</Link> */}
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