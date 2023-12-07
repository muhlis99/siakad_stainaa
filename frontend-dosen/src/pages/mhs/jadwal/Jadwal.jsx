import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/noData.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import moment from "moment"

const Jadwal = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [Jadwal, setJadwal] = useState([])
    const [biodata, setBiodata] = useState([])
    const [dataJadwal, setDataJadwal] = useState([])
    const [load, setLoad] = useState(false)

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
        const getDataJadwal = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/jadwalKuliah/getJadwalMahasiswa/${user.data.username}`)
                    setBiodata(response.data.identitas)
                    setDataJadwal(response.data.data)
                }
            } catch (error) {

            }
        }
        getDataJadwal()
    }, [user])


    return (
        <Layout>
            <title>Jadwal Kuliah</title>
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
                                <h3 className="page-title">Jadwal Kuliah</h3>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow mb-4 rounded-3'>
                                        <Card.Body className='justify py-3'>
                                            <Row className='py-4 ps-3 shadow-sm rounded' style={{ background: '#E9EAE1' }}>
                                                <Col lg="6" sm="12">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>nim</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{biodata.nim}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>nama</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{biodata.nama}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>fakultas</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{biodata.fakultas}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6" sm="12">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                                        </Col>
                                                        <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                            <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>{biodata.prodi}</Card.Text>
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
                                                            <Card.Text className='fw-bold text-uppercase'>{biodata.tahun_ajaran}</Card.Text>
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
                                                            <Card.Text className='fw-bold text-uppercase'>Semester {biodata.semester}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body className='p-3'>
                                            <Row className='mb-3'>
                                                <Col>
                                                    <div>
                                                        <Card.Title className='fs-6 text-primary'>Jadwal Kuliah Minggu Ini</Card.Title>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {dataJadwal.length != 0 ? dataJadwal.map((item, index) => (
                                                    <Col key={item.id_jadwal_pertemuan} lg="4" className='mb-3'>
                                                        <Card className='shadow h-100'>
                                                            <Card.Body className='p-3'>
                                                                <span className='text-capitalize fs-6 fw-semibold'>{item.jadwalKuliahs[0].hari},&nbsp;{moment(item.tanggal_pertemuan).format('DD MMMM YYYY')}</span>
                                                                <div className='text-muted'>
                                                                    <span className='fw-semibold text-[13px]'>
                                                                        {item.jadwalKuliahs[0].sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}
                                                                    </span>
                                                                </div>
                                                                <Row className='mt-3'>
                                                                    <Col lg="6" sm="6" md="6" className='mb-2 p-1'>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className=' text-[14px] text-capitalize text-dark'>Jam</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6" sm="6" md="6" className='mb-2 p-1'>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className=' text-[14px] text-capitalize text-dark'>{item.jenis_pertemuan}</span>
                                                                            {item.metode_pembelajaran == 'offline' ?
                                                                                <div className=' text-[13px] text-secondary text-capitalize'>{item.metode_pembelajaran}</div>
                                                                                : item.metode_pembelajaran == 'online' ?
                                                                                    <div className=' text-[13px] text-info text-capitalize'>{item.metode_pembelajaran}</div>
                                                                                    :
                                                                                    <div className=' text-[13px] text-info text-capitalize'>{item.metode_pembelajaran}</div>
                                                                            }
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6" sm="6" md="6" className='mb-2 p-1'>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className=' text-[14px] text-capitalize text-dark'>Ruang</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {item.jadwalKuliahs[0].ruangs[0].nama_ruang}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col lg="6" sm="6" md="6" className='mb-2 p-1'>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className=' text-[14px] text-capitalize text-dark'>Lokasi</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {item.jadwalKuliahs[0].ruangs[0].lokasi}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-2'>
                                                                    <Col>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className='text[12px] text-capitalize text-dark'>Dosen</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {item.jadwalKuliahs[0].dosenPengajar[0].nama == '' ? '-' : item.jadwalKuliahs[0].dosenPengajar[0].nama}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )) : <>

                                                </>}
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

export default Jadwal