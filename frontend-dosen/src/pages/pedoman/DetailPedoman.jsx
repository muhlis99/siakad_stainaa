import React, { useEffect, useState } from 'react'
import Layout from "../Layout"
import { Row, Col, Card, Image, Modal, Table } from 'react-bootstrap'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from 'moment'
import "./cek.css"


const DetailPedoman = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const [detail, setDetail] = useState([])
    const [urlDoc, setUrlDoc] = useState("")
    const [file, setFile] = useState("")
    const location = useLocation()

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
        const getPedomanById = async () => {
            try {
                const response = await axios.get(`v1/pedoman/getById/${location.state.idPedoman}`)
                setDetail(response.data.data)
                setFile(response.data.data.file_pedoman)
            } catch (error) {

            }
        }
        getPedomanById()
    }, [location])

    useEffect(() => {
        if (detail) {
            setUrlDoc('https://api-siamdos.stainaa.ac.id/v1/pedoman/public/seeLampiranPedoman/lampiranPedoman/' + detail.file_pedoman)
        } else {
            setUrlDoc('')
        }
    }, [detail])

    const docs = [
        { uri: urlDoc }
    ]

    const download = () => {
        fetch(`https://api-siamdos.stainaa.ac.id/v1/pedoman/public/seeLampiranPedoman/lampiranPedoman/${detail.file_pedoman}`).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob)

                let alink = document.createElement("a")
                alink.href = fileURL
                alink.download = detail.judul_pedoman
                alink.click()
            })
        })
    }

    return (
        <Layout>
            <title>Pedoman</title>
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
                                <h2 className='fs-4 font-bold'>Pedoman</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Row>
                                                <Col lg="6">
                                                    <div className='px-3 py-2 rounded-3 h-100' style={{ border: '1px dashed #919669' }}>
                                                        <span className='text[14px] text-capitalize text-dark font-bold'>Judul Pedoman</span>
                                                        <div className=' text-[13px] text-secondary'>
                                                            {detail.judul_pedoman}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className='px-3 py-2 rounded-3 h-100' style={{ border: '1px dashed #919669' }}>
                                                        <span className='text[14px] text-capitalize text-dark font-bold'>Tanggal Penerbitan</span>
                                                        <div className=' text-[13px] text-secondary'>
                                                            {moment(detail.tanggal_terbit).format('DD MMMM YYYY')}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col lg="12" className='mt-3'>
                                                    <div className='px-3 py-2 rounded-3 h-100' style={{ border: '1px dashed #919669' }}>
                                                        <span className='text[14px] text-capitalize text-dark font-bold'>Deskripsi Pedoman</span>
                                                        <div className=' text-[13px] text-secondary'>
                                                            {detail.deskripsi}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='mt-3'>
                                                <Col>
                                                    <div className='px-3 py-2 rounded-3' style={{ border: '1px dashed #919669' }}>
                                                        <p className='text[20px] text-capitalize text-dark font-bold'>File Pedoman</p>
                                                        <button className='btn btn-sm btn-primary ms-2 mb-2' onClick={download}>Download</button>
                                                        <DocViewer
                                                            documents={docs}
                                                            config={{
                                                                header: {
                                                                    disableHeader: true,
                                                                    disableFileName: true,
                                                                    retainURLParams: false

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

export default DetailPedoman