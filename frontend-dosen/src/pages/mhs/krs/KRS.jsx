import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import dataBlank from "../../../assets/images/noData.svg"
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const KRS = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [biodata, setBiodata] = useState([])
    const [dataKrs, setDataKrs] = useState([])
    const [button, setButton] = useState(true)
    const [pesan, setPesan] = useState(false)
    const [persetujuan, setPersetujuan] = useState(false)
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
        getDataKrs()
    }, [user])

    const getDataKrs = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaNow/${user.data.username}`)
                setBiodata(response.data.identitas)
                setDataKrs(response.data.data)
                if (response.data.data[0].status_pengajuan_krs == "diajukan") {
                    setButton(false)
                    setPesan(true)
                } else {
                    setButton(true)
                    setPesan(false)
                }

                if (response.data.data[0].status_krs == "setuju") {
                    setPesan(false)
                    setPersetujuan(true)
                } else {
                    setPersetujuan(false)
                }
            }
        } catch (error) {

        }
    }

    const simpanPengajuan = async () => {
        try {
            await axios.put(
                `v1/krs/pengajuanKrsMahasiswa/${biodata.nim}`
            ).then(function (response) {
                Swal.fire({
                    title: "KRS Berhasil Diajukan",
                    icon: "success"
                }).then(() => {
                    getDataKrs()
                })
            })
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Kartu Rencana Studi Paket</title>
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
                                <h2 className='fs-4 font-bold' >Kartu Rencana Studi</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow mb-4'>
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
                                                </Col>
                                                <Col lg="6" sm="12">
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
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Body>
                                            <Row className=''>
                                                <Col className='p-0'>
                                                    <div className="table-responsive">
                                                        <Table hover>
                                                            <thead className='rounded'>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>{button ? '#' : 'NO'}</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>Kode MK</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>Mata Kuliah</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>SKS</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>Bobot MK</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>Status MK</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#e9eae1' }}>Status KRS</th>
                                                                </tr>
                                                            </thead>
                                                            {dataKrs.length > 0 ?
                                                                <tbody>
                                                                    {
                                                                        dataKrs.map((item, index) => (
                                                                            <tr key={item.id_krs} className='border'>
                                                                                <th className='py-3 text-[#3b3a3a]'>
                                                                                    {item.status_krs == "setuju" ? index + 1 : <div className="flex items-center">
                                                                                        <input checked id="disabled-checked-checkbox" type="checkbox" readOnly value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                    </div>}

                                                                                </th>
                                                                                <td className='py-3 text-[#3b3a3a]'>{item.sebaranMataKuliahs[0].mataKuliahs[0].code_mata_kuliah}</td>
                                                                                <td className='py-3 text-[#3b3a3a]'>{item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                                <td className='py-3 text-[#3b3a3a]'>{item.sebaranMataKuliahs[0].mataKuliahs[0].sks}</td>
                                                                                <td className='py-3 text-[#3b3a3a]'>{item.sebaranMataKuliahs[0].status_bobot_makul}</td>
                                                                                <td className='py-3 text-[#3b3a3a] text-capitalize'>{item.sebaranMataKuliahs[0].status_makul}</td>
                                                                                <td className='py-3 text-[#3b3a3a]'>
                                                                                    {item.status_krs == "setuju" ?
                                                                                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Disetujui</span>
                                                                                        :
                                                                                        <>
                                                                                            {item.status_pengajuan_krs == "tidak" ?
                                                                                                <span className="inline-block whitespace-nowrap rounded-pill bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum Diajukan</span>
                                                                                                :
                                                                                                <span className="inline-block whitespace-nowrap rounded-pill bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Diajukan</span>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                    <tr className='border'>
                                                                        <td colSpan={3} align='center' className='py-3'>
                                                                            Total SKS
                                                                        </td>
                                                                        <td colSpan={4} className='py-3'>
                                                                            {biodata.total_sks}
                                                                        </td>
                                                                    </tr>
                                                                </tbody> :
                                                                <tbody>
                                                                    <tr className='border'>
                                                                        <td colSpan={7} align='center'>
                                                                            <Image src={dataBlank} thumbnail width={150} />
                                                                            <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            }
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {dataKrs.length > 0 ?
                                                        <div className='flex justify-center'>
                                                            {button &&
                                                                <button type='button' onClick={simpanPengajuan} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center mt-2 float-right' ><FaUpload /> &nbsp; <span>Ajukan</span></button>
                                                            }
                                                        </div> : ""
                                                    }
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <span className='font-bold text-muted'>Informasi :</span><br />
                                                        {dataKrs.length > 0 ?
                                                            <span className='font-bold text-muted text-[14px]'>- KRS ini adalah KRS paket yang telah dicentang otomatis oleh sistem.</span>
                                                            :
                                                            <span className='font-bold text-muted text-[14px]'>- Untuk saat ini KRS masih belum diaktifkan.</span>
                                                        }
                                                        {pesan &&
                                                            <><br /><span className='font-bold text-muted text-[14px]'>- KRS telah diajukan, silakan tunggu untuk informasi lebih lanjut.</span></>
                                                        }

                                                        {persetujuan &&
                                                            <><br /><span className='font-bold text-muted text-[14px]'>- KRS telah disetujui oleh dosen wali.</span></>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Card.Footer>
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

export default KRS