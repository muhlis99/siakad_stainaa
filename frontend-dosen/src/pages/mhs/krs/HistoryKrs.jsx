import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image, Dropdown } from 'react-bootstrap'
import dataBlank from "../../../assets/images/noData.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import { GoSingleSelect } from "react-icons/go"

const HistoryKrs = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [SemesterMhs, setSemesterMhs] = useState([])
    const [parameters, setParameters] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [nim, setNim] = useState("")
    const [nama, setNama] = useState("")
    const [biodata, setBiodata] = useState("")
    const [riwayat, setRiwayat] = useState("")
    const [total, setTotal] = useState(true)
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
        // console.log(parameters);
    }, [parameters])

    useEffect(() => {
        const getSemesterMhs = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/krs/getSemesterMhs/${user.data.username}`)
                    setSemesterMhs(response.data.data)
                }
            } catch (error) {

            }
        }
        getSemesterMhs()
    }, [user])

    useEffect(() => {
        const getBiodata = async () => {
            if (user) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaNow/${user.data.username}`)
                setNama(response.data.identitas.nama)
                setNim(response.data.identitas.nim)
                setKodeTahun(response.data.data[0].code_tahun_ajaran)
                setKodeSemester(response.data.data[0].code_semester)
            }
        }
        getBiodata()
    }, [user])

    useEffect(() => {
        const getHistoryKrs = async () => {
            if (user && parameters) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaHistory/${user.data.username}/${parameters}`)
                setBiodata(response.data.identitas)
                setRiwayat(response.data.data)
                if (response.data.data[0].status_krs == "") {
                    setTotal(false)
                } else {
                    setTotal(true)
                }
            }
        }
        getHistoryKrs()
    }, [user, parameters])

    return (
        <Layout>
            <title>Riwayat Kartu Rencana Studi</title>
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
                                <h2 className='fs-4 font-bold' >Riwayat Kartu Rencana Studi</h2>
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
                                                            <Card.Text className='fw-bold text-uppercase'>{nim}</Card.Text>
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
                                                            <Card.Text className='fw-bold text-uppercase'>{nama}</Card.Text>
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
                                                        <Col className='p-0 d-flex gap-2'>
                                                            <Card.Text className='fw-bold text-uppercase'>Semester {biodata.semester}</Card.Text>
                                                            <Dropdown>
                                                                <Dropdown.Toggle className='p-0 btn btn-light' id="dropdown-basic">
                                                                    <GoSingleSelect className='text-[20px]' />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    {SemesterMhs.map((item) => (
                                                                        <Dropdown.Item key={item.id_history} onClick={() => setParameters(item.code_tahun_ajaran + '/' + item.code_semester + '/' + item.status)}>
                                                                            Semester {item.semesters[0].semester}
                                                                        </Dropdown.Item>
                                                                    ))}
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                        </Card.Body>
                                    </Card>
                                    <Card className='shadow'>
                                        <Card.Body className='py-3'>
                                            <Row className='mt-2'>
                                                <Col className='p-1'>
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
                                                                </tr>
                                                            </thead>
                                                            {riwayat.length >= 1 ?
                                                                <tbody>
                                                                    {riwayat.map((item, index) => (
                                                                        <tr key={item.id_krs} className='border'>
                                                                            <td className='py-3'>{index + 1}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].code_mata_kuliah}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].mataKuliahs[0].sks}</td>
                                                                            <td className='py-3'>{item.sebaranMataKuliahs[0].status_bobot_makul}</td>
                                                                            <td className='py-3 text-capitalize'>{item.sebaranMataKuliahs[0].status_makul}</td>
                                                                        </tr>
                                                                    ))}
                                                                    {total &&
                                                                        <tr className='border'>
                                                                            <td colSpan={3} align='center' className='py-3'>
                                                                                Total SKS
                                                                            </td>
                                                                            <td colSpan={3} className='py-3'>
                                                                                {biodata.total_sks}
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                                :
                                                                <tbody>
                                                                    <tr className='border'>
                                                                        <td colSpan={6} align='center'>
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

export default HistoryKrs