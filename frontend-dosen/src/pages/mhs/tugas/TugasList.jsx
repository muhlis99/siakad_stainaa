import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate } from "react-router-dom"
import { Circles } from "react-loader-spinner"
import dataBlank from "../../../assets/images/watch.svg"
import axios from 'axios'
import moment from 'moment'

const TugasList = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const [Tugas, setTugas] = useState([])
    const [kodeTugas, setKodeTugas] = useState([])
    const [dataTanggal, setDataTanggal] = useState([])
    const [statusPengumpulan, setStatusPengumpulan] = useState([])

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
        getTugas()
    }, [user])

    useEffect(() => {
        getKodeTugas()
    }, [Tugas])

    useEffect(() => {
        getTanggal()
        getStatusPengumpulan()
    }, [username, kodeTugas])

    const getTugas = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/tugas/allmhs/${user.data.username}`)
                setTugas(response.data.data)
                console.log(response.data.data);
            }
        } catch (error) {

        }
    }

    const getKodeTugas = () => {
        var i = Tugas.map(item => (
            item.Mtugas[0].code_tugas
        ))
        setKodeTugas(i)
    }

    const getTanggal = async () => {
        if (kodeTugas.length > 0) {
            let Tugass = []
            let promises = []
            for (let i = 0; i < kodeTugas.length; i++) {
                const t = await axios.get('v1/tugas/tugasmhsbycode/' + kodeTugas[i]).then(response => {
                    Tugass.push(response.data.data)
                })
                promises.push(t)

            }
            if (kodeTugas.length != 0) {
                Promise.all(promises).then(() => setDataTanggal(Tugass))
                Promise.all(promises).then(() => console.log(Tugass))
            }
        }
    }

    const getStatusPengumpulan = async () => {
        if (kodeTugas.length > 0) {
            let statuss = []
            let prom = []
            for (let i = 0; i < kodeTugas.length; i++) {
                const t = await axios.get(`v1/detailTugas/getByCodeTugas/${kodeTugas[i]}/${username}`).then(response => {
                    statuss.push(response.data.data[0].status)
                })
                prom.push(t)

            }
            if (kodeTugas.length != 0) {
                Promise.all(prom).then(() => setStatusPengumpulan(statuss))
                // Promise.all(prom).then(() => console.log(statuss))
            }
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
                                        <Card.Body className='p-3'>
                                            <Row>
                                                {Tugas.length > 0 ? Tugas.map((item, index) => (
                                                    <Col key={index} lg="4">
                                                        <Card className='shadow'>
                                                            <Card.Body className='p-3'>
                                                                <span className='text-capitalize fs-6 fw-semibold'>{item.tugas}</span>
                                                                <Row className='mt-2'>
                                                                    <Col>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className='text[12px] text-capitalize text-dark'>Deskripsi Tugas</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {item.Mtugas[0].deskripsi_tugas}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-2'>
                                                                    <Col>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className='text[12px] text-capitalize text-dark'>Batas Pengumpulan</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {
                                                                                    dataTanggal != 0 ?
                                                                                        moment(dataTanggal[index].tanggal_akhir).format('DD MMMM YYYY')
                                                                                        : ""
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-2'>
                                                                    <Col>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className='text[12px] text-capitalize text-dark'>Status Tugas</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {dataTanggal != 0 ?
                                                                                    <div>
                                                                                        {
                                                                                            dataTanggal[index].status == 'belum' ?
                                                                                                <span className="inline-block whitespace-nowrap rounded-pill bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum Berakhir</span>
                                                                                                :
                                                                                                <span className="inline-block whitespace-nowrap rounded-pill bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Sudah Berakhir</span>
                                                                                        }
                                                                                    </div>
                                                                                    : ""
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-2'>
                                                                    <Col>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className='text[12px] text-capitalize text-dark'>Status Pengumpulan</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                {
                                                                                    statusPengumpulan[index] == 'tidak' ?
                                                                                        <span className="inline-block whitespace-nowrap rounded-pill bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum Mengumpulkan</span>
                                                                                        :
                                                                                        <span className="inline-block whitespace-nowrap rounded-pill bg-success px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Sudah Mengumpulkan</span>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-2'>
                                                                    <Col>
                                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                                            <span className='text[12px] text-capitalize text-dark'>Aksi</span>
                                                                            <div className=' text-[13px] text-secondary'>
                                                                                <Link to="/tugasdetail" state={{ idTugas: item.id_tugas, kodeTgs: item.code_tugas }} className='btn btn-sm btn-info'>Selengkapnya</Link>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )) :
                                                    <div className='flex justify-center'>
                                                        <div>
                                                            <Image src={dataBlank} className='mt-4 ' width={150} />
                                                            <p className='text-muted font-bold'>Tidak ada data</p>
                                                        </div>
                                                    </div>
                                                }
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

export default TugasList