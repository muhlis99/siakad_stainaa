import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate, useLocation } from "react-router-dom"
import dataBlank from "../../../assets/images/noData.svg"
import axios from 'axios'
import { FaCheck } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const DetailKrs = () => {
    const [Tahun, setTahun] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [RencanaStudi, setRencanaStudi] = useState([])
    const [button, setButton] = useState(true)
    const [pesan, setPesan] = useState(false)
    const [tabel, setTabel] = useState(false)
    const location = useLocation()
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

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
                } else if (response.data.data[0].status_krs == '') {
                    setButton(true)
                    setPesan(false)
                } else {
                    setButton(true)
                    setPesan(false)
                }

                if (response.data.data[0].status_pengajuan_krs == 'tidak') {
                    setButton(false)
                    setTabel(true)
                } else {
                    setTabel(false)
                }
            }
        } catch (error) {
            setRencanaStudi([])
        }
    }

    const simpanPersetujuan = () => {
        Swal.fire({
            title: "Anda Yakin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, setujui',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`v1/krs/approveKrsMahasiswaByPemdik`, {
                        nim: location.state,
                        tahunAjaran: kodeTahun,
                        status_krs: 'setuju'
                    }).then(function (response) {
                        Swal.fire({
                            title: "KRS Berhasil Disetujui",
                            icon: "success"
                        }).then(() => {
                            getKrsMhs()
                        })
                    })
                } catch (error) {

                }
            }
        })
    }

    return (
        <Layout>
            <title>KRS Mahasiswa</title>
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
                            <div className="page-header">
                                <h2 className='fs-4 font-bold' >Detail KRS Mahasiswa</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className="shadow">
                                        <Card.Body className='py-3'>
                                            <Row className='bg-[#E9EAE1] py-3 px-3 shadow-sm rounded'>
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
                                                            <div className='flex justify-start'>
                                                                <div>
                                                                    <select className="form-select form-select-sm" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                                        {Tahun.map((item) => (
                                                                            <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
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
                                        </Card.Body>
                                    </Card>
                                    <Card className="shadow mt-3">
                                        <Card.Body className='py-3'>
                                            <Row className='mt-2'>
                                                <Col className='p-0'>
                                                    <div className="table-responsive">
                                                        <Table hover>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Kode MK</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Mata Kuliah</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>SKS</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Bobot MK</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status MK</th>
                                                                    <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Status KRS</th>
                                                                </tr>
                                                            </thead>
                                                            {RencanaStudi.length == 0 || tabel ?
                                                                <tbody>
                                                                    <tr className='border'>
                                                                        <td colSpan={7} align='center'>
                                                                            <Image src={dataBlank} thumbnail width={150} />
                                                                            <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                                :
                                                                <tbody>
                                                                    {RencanaStudi.map((item, index) => (
                                                                        <tr key={item.id_krs} className='border'>
                                                                            <td className='py-3'>
                                                                                {item.status_krs == "setuju" ? index + 1 : <div className="flex items-center">
                                                                                    <input checked readOnly id="disabled-checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                </div>}
                                                                            </td>
                                                                            <td className='py-3'>{item.code_mata_kuliah}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].sks}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].status_bobot_makul}</td>
                                                                            <td className='py-3 text-capitalize'>{item.sebaranMataKuliahs[0].status_makul}</td>
                                                                            <td className='py-3'>
                                                                                {item.status_krs == "setuju" ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">Disetujui</span>
                                                                                    :
                                                                                    <>
                                                                                        {item.status_pengajuan_krs == "tidak" || item.status_pengajuan_krs == "" ?
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
                                                                        <td colSpan={3} align='center' className='py-3'>
                                                                            Total SKS
                                                                        </td>
                                                                        <td colSpan={4} className='py-3'>
                                                                            {identitas.total_sks}
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
                                                            {button && <button type='button' onClick={simpanPersetujuan} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center mt-2 float-right' ><FaCheck /> &nbsp; <span>Setujui</span></button>}
                                                        </div>
                                                        : ""}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <span className='font-bold text-muted'>Informasi :</span>
                                                        {button && <><br /><span className='font-bold text-muted text-[14px]'>- KRS ini adalah KRS paket yang telah dicentang otomatis oleh sistem.</span></>}
                                                        {button && <><br /><span className='font-bold text-muted text-[14px]'>- KRS telah diajukan oleh mahasiswa, silakan lakukan persetujuan dengan melakukan klik tombol di atas.</span></>}
                                                        {pesan && <><br /><span className='font-bold text-muted text-[14px]'>- KRS telah disetujui.</span></>}
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

export default DetailKrs