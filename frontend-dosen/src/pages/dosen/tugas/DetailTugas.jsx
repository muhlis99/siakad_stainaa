import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from 'moment'

const DetailTugas = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const location = useLocation()
    const [detailTugas, setDetailTugas] = useState([])
    const [nama, setNama] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [semester, setSemester] = useState("")
    const [fileName, setFileName] = useState("")
    const [urlDoc, setUrlDoc] = useState("")
    const [lampiranJawaban, setLampiranJawaban] = useState("")

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        // console.log(location.state)
    }, [location])

    useEffect(() => {
        const getMhsByNim = async () => {
            try {
                const response = await axios.get(`v1/mahasiswa/getByNim/${location.state.nim}`)
                setNama(response.data.data.nama)
                setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
                setProdi(response.data.data.prodis[0].nama_prodi)
            } catch (error) {

            }
        }
        getMhsByNim()
    }, [location])

    useEffect(() => {
        const getDetailTugas = async () => {
            try {
                const response = await axios.get(`v1/detailTugas/getByCodeTugas/${location.state.kodeTgs}/${location.state.nim}`)
                setDetailTugas(response.data.data[0])
                setLampiranJawaban(response.data.data[0].file_jawaban)
            } catch (error) {

            }
        }
        getDetailTugas()
    }, [location])

    useEffect(() => {
        if (lampiranJawaban == null) {
            setUrlDoc('')
        } else {
            setUrlDoc('http://localhost:4002/v1/detailTugas/public/seeLampiranJawaban/lampiranJawaban/' + lampiranJawaban)
        }
    }, [lampiranJawaban])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const docs = [
        { uri: urlDoc }
    ]

    const download = () => {
        fetch(`http://localhost:4002/v1/detailTugas/public/seeLampiranJawaban/lampiranJawaban/${lampiranJawaban}`).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob)

                let alink = document.createElement("a")
                alink.href = fileURL
                alink.download = 'Tugas Kuliah ' + nama
                alink.click()
            })
        })
    }

    return (
        <Layout>
            <title>Detail Tugas Kuliah</title>
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
                                <h2 className='fs-4 font-bold'>Detail Tugas Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body className='py-3'>
                                            <Row className='shadow-sm py-3 rounded' style={{ background: '#E9EAE1' }}>
                                                <Col lg="7">
                                                    <Row className='mb-2'>
                                                        <Col lg="4">
                                                            <a>NAMA</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{nama}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="4">
                                                            <a>JENJANG PENDIDIKAN</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a> {jenjang}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="5">
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>FAKULTAS</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>: </span><a>{fakultas}</a>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col lg="3">
                                                            <a>PRODI</a>
                                                        </Col>
                                                        <Col className='flex gap-2'>
                                                            <span className='hidden lg:block'>:
                                                            </span>
                                                            <a>{prodi}</a>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Card className='mt-3'>
                                        <Card.Body className='p-3'>
                                            {detailTugas == null ? <>
                                                <div className='text-center'>
                                                    <div className='flex justify-center'>
                                                        <Image src={dataBlank} className='mt-4 ' width={150} />
                                                    </div>
                                                    {/* <p className='text-muted font-bold'>Anda belum mengumpulkan tugas!</p> */}
                                                    {/* <button onClick={() => openModal('upload', '')} className='btn btn-sm btn-success my-2'>Kumpulkan tugas</button> */}
                                                </div>
                                            </> : <>
                                                <Row>
                                                    <Col>
                                                        <div className='px-3 py-2 rounded-3 h-100' style={{ border: '1px dashed #919669' }}>
                                                            <span className='text[14px] text-capitalize text-dark font-bold'>Deskripsi Jawaban</span>
                                                            <div className=' text-[13px] text-secondary  mt-1'>
                                                                {detailTugas.jawaban}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='px-3 py-2 rounded-3  h-100' style={{ border: '1px dashed #919669' }}>
                                                            <span className='text[14px] text-capitalize text-dark font-bold'>Tanggal Pengumpulan</span>
                                                            <div className=' text-[13px] text-secondary  mt-1'>
                                                                {moment(detailTugas.tanggal_pengumpulan).format('DD MMMM YYYY')}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='px-3 py-2 rounded-3  h-100' style={{ border: '1px dashed #919669' }}>
                                                            <span className='text[14px] text-capitalize text-dark font-bold'>Download Tugas</span>
                                                            <div className=' text-[13px] text-secondary'>
                                                                <button className='btn btn-sm btn-success' onClick={download}>Download</button>
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

export default DetailTugas