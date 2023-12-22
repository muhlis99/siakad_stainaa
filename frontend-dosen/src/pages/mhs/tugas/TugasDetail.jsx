import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Image, Modal } from 'react-bootstrap'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import dataBlank from "../../../assets/images/watch.svg"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const TugasDetail = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const location = useLocation()
    const [nim, setNim] = useState("")
    const [Tugas, setTugas] = useState([])
    const [detail, setDetail] = useState([])
    const [jawaban, setJawaban] = useState("")
    const [fileJawaban, setFileJawaban] = useState("")
    const [modal, setModal] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {
        // console.log(location.state);
    }, [location])

    useEffect(() => {
        if (user) {
            setNim(user.data.username)
        }
    }, [user])

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
        const getDetailTugas = async () => {
            try {
                const response = await axios.get(`v1/tugas/tugasmhsbycode/${location.state.kodeTgs}`)
                setTugas(response.data.data)
            } catch (error) {

            }
        }
        getDetailTugas()
    }, [location])

    useEffect(() => {
        getDetail()
    }, [location])

    const getDetail = async () => {
        try {
            const response = await axios.get(`v1/detailTugas/getByCodeTugas/${location.state.kodeTgs}`)
            setDetail(response.data.data[0])
        } catch (error) {

        }
    }

    const openModal = async (e) => {
        setShow(true)
        setModal(e)
    }

    const handleClose = () => {
        setShow(false)
    }

    const loadFile = (e) => {
        const file = e.target.files[0]
        setFileJawaban(file)
    }

    const kumpulkan = async (e) => {
        e.preventDefault()
        var date1 = moment()
        var date2 = Tugas.tanggal_akhir
        var time1 = moment(date1).format('YYYY-MM-DD');
        var time2 = moment(date2).format('YYYY-MM-DD');
        if (time2 < time1) {
            Swal.fire({
                title: 'Waktu telah kedaluarsa',
                text: 'Anda mengumpulkan tugas melebihi batas terakhir pengumpulan',
                icon: 'error'
            })
        } else if (jawaban == '') {
            Swal.fire({
                title: 'Deskripsi jawaban kosong',
                icon: 'error'
            })
        } else if (fileJawaban == '') {
            Swal.fire({
                title: 'Tidak ada file yang diupload',
                icon: 'error'
            })
        } else {
            setLoad(true)
            const formData = new FormData()
            formData.append('code_tugas', location.state.kodeTgs)
            formData.append('nim', nim)
            formData.append('jawaban', jawaban)
            formData.append('file_jawaban', fileJawaban)
            try {
                await axios.post(`v1/detailTugas/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    handleClose()
                    setLoad(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getDetail()
                    });
                })
            } catch (error) {

            }
        }
    }

    const docs = [
        { uri: "http://localhost:4002/v1/detailTugas/public/seeLampiranJawaban/lampiranJawaban/" + detail.file_jawaban }
    ]

    const lampiran = [
        { uri: "http://localhost:4002/v1/tugas/public/seeLampiranTugas/lampiranTugas/" + Tugas.file_tugas }
    ]

    return (
        <Layout>
            <title>Tugas Kuliah</title>
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
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                size='lg'
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                                {modal == 'upload' ?
                                    <Modal.Body>
                                        <form
                                            onSubmit={kumpulkan}
                                        >
                                            <div className='form-group'>
                                                <label htmlFor="deskripsi" className='h6'>Deskripsi Jawaban</label>
                                                <textarea
                                                    id="deskripsi"
                                                    cols="30"
                                                    rows="3"
                                                    placeholder='Deskripsi Jawaban'
                                                    value={jawaban} onChange={(e) => setJawaban(e.target.value)}
                                                    className='form-control form-control-sm'
                                                ></textarea>
                                            </div>
                                            <div className='form-group'>
                                                <label htmlFor="judul" className='h6'>File Jawaban</label>
                                                <input id='judul' placeholder='Judul Tugas'
                                                    onChange={loadFile}
                                                    type="file" className='form-control form-control-sm' />
                                            </div>
                                            <hr />
                                            <Row>
                                                <Col>
                                                    <button className='float-end btn btn-info btn-sm'>Simpan</button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Modal.Body>
                                    :
                                    <Modal.Body>
                                        <Row>
                                            <Col>
                                                <DocViewer
                                                    documents={lampiran}
                                                    config={{
                                                        header: {
                                                            disableHeader: true,
                                                            disableFileName: true,
                                                            retainURLParams: false,
                                                        }
                                                    }}
                                                    theme={{
                                                        primary: "#5296d8",
                                                        secondary: "#ffffff",
                                                        tertiary: "#5296d899",
                                                        textPrimary: "#ffffff",
                                                        textSecondary: "#5296d8",
                                                        textTertiary: "#00000099",
                                                        disableThemeScrollbar: false,
                                                    }}
                                                    pluginRenderers={DocViewerRenderers}
                                                />
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                }
                            </Modal>

                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Tugas Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
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
                                                            <span className='hidden lg:block'>: </span>{Tugas.file_tugas ? <button className='btn btn-sm btn-primary' onClick={() => openModal('lampiran')}>Lihat Lampiran</button> : <a>Lampiran tidak ada</a>}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mt-3'>
                                        <Card.Body className='p-3'>
                                            {detail.length == 0 ? <>
                                                <div className='text-center'>
                                                    <div className='flex justify-center'>
                                                        <Image src={dataBlank} className='mt-4 ' width={150} />
                                                    </div>
                                                    <p className='text-muted font-bold'>Anda belum mengumpulkan tugas!</p>
                                                    <button onClick={() => openModal('upload')} className='btn btn-sm btn-success my-2'>Kumpulkan tugas</button>
                                                </div>
                                            </> : <>
                                                <Row>
                                                    <Col>
                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                            <span className='text[14px] text-capitalize text-dark font-bold'>Deskripsi Jawaban</span>
                                                            <div className=' text-[13px] text-secondary'>
                                                                {detail.jawaban}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                            <span className='text[14px] text-capitalize text-dark font-bold'>Tanggal Pengumpulan</span>
                                                            <div className=' text-[13px] text-secondary'>
                                                                {moment(detail.tanggal_pengumpulan).format('DD MMMM YYYY')}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className='mt-2'>
                                                    <Col>
                                                        <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                            <span className='text[14px] text-capitalize text-dark font-bold'>File Jawaban</span>
                                                            <DocViewer
                                                                documents={docs}
                                                                config={{
                                                                    header: {
                                                                        disableHeader: true,
                                                                        disableFileName: true,
                                                                        retainURLParams: false,
                                                                    }
                                                                }}
                                                                theme={{
                                                                    primary: "#5296d8",
                                                                    secondary: "#ffffff",
                                                                    tertiary: "#5296d899",
                                                                    textPrimary: "#ffffff",
                                                                    textSecondary: "#5296d8",
                                                                    textTertiary: "#00000099",
                                                                    disableThemeScrollbar: false,
                                                                }}
                                                                pluginRenderers={DocViewerRenderers}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </>}
                                        </Card.Body>
                                    </Card>

                                </Col>
                            </Row>
                        </div>
                    }
                </>}
        </Layout>
    )
}

export default TugasDetail