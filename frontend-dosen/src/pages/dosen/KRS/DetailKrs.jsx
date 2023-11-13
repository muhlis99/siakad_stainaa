import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate, useLocation } from "react-router-dom"
import dataBlank from "../../../assets/images/noData.svg"
import axios from 'axios'
import { FaCheck } from 'react-icons/fa'

const DetailKrs = () => {
    const [Tahun, setTahun] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [RencanaStudi, setRencanaStudi] = useState([])
    const [button, setButton] = useState(true)
    const [pesan, setPesan] = useState(false)
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    useEffect(() => {
        getTahunAjaran()
    }, [])

    useEffect(() => {
        const getBiodata = async () => {
            if (location.state) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaNow/${location.state}`)
                setKodeTahun(response.data.data[0].code_tahun_ajaran)
            }
        }
        getBiodata()
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getKrsMhs()
    }, [location, kodeTahun])

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get(`v1/tahunAjaran/all`)
            setTahun(response.data.data)
        } catch (error) {

        }

    }

    const getKrsMhs = async () => {
        try {
            if (location && kodeTahun) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaByPemdik/${location.state}/${kodeTahun}`)
                setIdentitas(response.data.identitas)
                setRencanaStudi(response.data.data)
                if (response.data.data[0].status_krs == 'setuju') {
                    setButton(false)
                    setPesan(true)
                } else {
                    setButton(true)
                    setPesan(false)
                }
            }
        } catch (error) {
            setRencanaStudi([])
        }
    }

    // const simpanPersetujuan = async () => {
    //     try {
    //         await axios.p
    //     } catch (error) {

    //     }
    // }

    return (
        <Layout>
            {isError ? <Navigate to="/login" replace />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">Detail KRS Mahasiswa</h3>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Row className='bg-[#E9EAE1] border-l-2 border-[#5E7C60] py-3 px-3 shadow-sm rounded-r-lg'>
                                        <Col lg="6" sm="12">
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>nim</Card.Text>
                                                </Col>
                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                    <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.nim}</Card.Text>
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
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.nama}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Jenjang</Card.Text>
                                                </Col>
                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                    <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.code_jenjang_pendidikan}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                                </Col>
                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                    <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.code_fakultas}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg="6" sm="12">
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>prodi</Card.Text>
                                                </Col>
                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                    <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.code_prodi}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Row className='mb-2'>
                                                <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                    <Card.Text className='fw-bold text-uppercase'>periode</Card.Text>
                                                </Col>
                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                    <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                                </Col>
                                                <Col className='p-0'>
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.tahun_ajaran}</Card.Text>
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
                                                    <Card.Text className='fw-bold text-uppercase'>{identitas.semester}</Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Col>
                                            <div className='flex justify-center'>
                                                <select className="form-select w-25" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                    {Tahun.map((item) => (
                                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col className='p-0'>
                                            <div className="table-responsive">
                                                <Table hover>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>#</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Kode MK</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>SKS</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Bobot MK</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Status MK</th>
                                                            <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Status KRS</th>
                                                        </tr>
                                                    </thead>
                                                    {RencanaStudi.length > 0 ?
                                                        <tbody>
                                                            {RencanaStudi.map((item, index) => (
                                                                <tr key={item.id_krs} className='border'>
                                                                    <th scope='row' className='py-2'>
                                                                        {item.status_krs == "setuju" ? index + 1 : <div className="flex items-center">
                                                                            <input checked id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                        </div>}
                                                                    </th>
                                                                    <td className='py-2'>{item.code_mata_kuliah}</td>
                                                                    <td className='py-2'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                                    <td className='py-2'>{item.mataKuliahs[0].sks}</td>
                                                                    <td className='py-2'>{item.mataKuliahs[0].status_bobot_makul}</td>
                                                                    <td className='py-2 text-capitalize'>{item.mataKuliahs[0].status_makul}</td>
                                                                    <td className='py-2'>
                                                                        {item.status_krs == "setuju" ?
                                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Disetujui</span>
                                                                            :
                                                                            <>
                                                                                {item.status_pengajuan_krs == "tidak" ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Belum Diajukan</span>
                                                                                    :
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Diajukan</span>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr className='border'>
                                                                <td colSpan={3} align='center' className='font-bold'>
                                                                    Total SKS
                                                                </td>
                                                                <td colSpan={4} className='font-bold'>
                                                                    {identitas.total_sks}
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
                                            {RencanaStudi.length > 0 ?
                                                <div className='flex justify-center'>
                                                    {button && <button type='button' className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center mt-2 float-right' ><FaCheck /> &nbsp; <span>Setujui</span></button>}
                                                </div>
                                                : ""}
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <div>
                                                <span className='font-bold'>Informasi :</span>
                                                {button && <><br /><span className='font-bold text-[14px]'>- KRS ini adalah KRS paket yang telah dicentang otomatis oleh sistem.</span></>}
                                                {button && <><br /><span className='font-bold text-[14px]'>- KRS telah diajukan oleh mahasiswa, silakan lakukan persetujuan dengan melakukan klik tombol di atas.</span></>}
                                                {pesan && <><br /><span className='font-bold text-[14px]'>- KRS telah disetujui.</span></>}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </Layout>
    )
}

export default DetailKrs