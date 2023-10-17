import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Row, Col, Card, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { FaReply, FaSave } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from "moment"

const TambahPengajuan = () => {
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false)
    const { isError, user } = useSelector((state) => state.auth)
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [statusStudi, setStatusStudi] = useState("")
    const [alasan, setAlasan] = useState("")
    const [nim, setNim] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [tglPengajuan, setTglPengajuan] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setTglPengajuan(moment().format('YYYY-MM-DD'))
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getDataTahun()
    }, [])

    useEffect(() => {
        getDataSemester()
    }, [kodeTahun])

    useEffect(() => {
        getBiodataMHS()
    }, [user])

    const getDataTahun = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getDataSemester = async () => {
        if (kodeTahun) {
            setKodeSemester("")
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        } else {
            setSemester([])
            setKodeSemester('')
        }
    }

    const getBiodataMHS = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                setNim(response.data.data.nim)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeProdi(response.data.data.code_prodi)
            }
        } catch (error) {

        }
    }

    const simpanPengajuan = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            try {
                await axios.post('v1/pengajuanStudi/createMahasiswa', {
                    code_tahun_ajaran: kodeTahun,
                    code_semester: kodeSemester,
                    code_jenjang_pendidikan: kodeJenjang,
                    code_fakultas: kodeFakultas,
                    code_prodi: kodeProdi,
                    nim: nim,
                    tanggal_pengajuan: tglPengajuan,
                    pengajuan: statusStudi,
                    alasan: alasan
                }).then(function (response) {
                    Swal.fire({
                        title: 'Berhasil',
                        icon: 'success'
                    }).then(() => {
                        navigate('/pengajuanstudi')
                    })
                })
            } catch (error) {
                console.log(error.response)
            }
        }

        setValidated(true);
    }

    return (
        <Layout>
            {
                isError ?
                    <Navigate to="/login" />
                    :
                    <div className="content-wrapper">
                        <div className="page-header d-flex gap-2">
                            <h3 className="page-title">Riwayat Studi Mahasiswa</h3>
                        </div>
                        <Form noValidate validated={validated} onSubmit={simpanPengajuan}>
                            <Row>
                                <Col>
                                    <Card className='shadow-sm'>
                                        <Card.Body>
                                            <Row>
                                                <Col lg="6" className="mb-2">
                                                    <Row>
                                                        <label htmlFor="periode" className="col-sm-4 col-form-label h6"><strong>Periode</strong></label>
                                                        <div className="col-sm-8">
                                                            <select id='periode' required className='form-select' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                                <option value="">Periode</option>
                                                                {Tahun.map((item) => (
                                                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                                ))}
                                                            </select>
                                                            <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                                                                Tidak boleh kosong
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col lg="6" className="mb-2">
                                                    <Row>
                                                        <label htmlFor="semester" className="col-sm-4 col-form-label h6"><strong>Semester</strong></label>
                                                        <div className="col-sm-8">
                                                            <select id='semester' required className='form-select' value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                                                <option value="">Semester</option>
                                                                {Semester.map((item) => (
                                                                    <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                                                ))}
                                                            </select>
                                                            <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                                                                Tidak boleh kosong
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col lg="6" className="mb-2">
                                                    <Row>
                                                        <label htmlFor="status" className="col-sm-4 col-form-label h6"><strong>Status Yang Diajukan</strong></label>
                                                        <div className="col-sm-8">
                                                            <select id='status' required className='form-select' value={statusStudi} onChange={(e) => setStatusStudi(e.target.value)}>
                                                                <option value="">Status Studi</option>
                                                                <option value="cuti">Cuti</option>
                                                                <option value="berhenti">Berhenti</option>
                                                            </select>
                                                            <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                                                                Tidak boleh kosong
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col lg="6" className="mb-2">
                                                    <Row>
                                                        <label htmlFor="alasan" className="col-sm-4 col-form-label h6"><strong>Alasan</strong></label>
                                                        <div className="col-sm-8">
                                                            <textarea className="form-control" required id="alasan" rows="4" placeholder='Alasan' value={alasan} onChange={(e) => setAlasan(e.target.value)}></textarea>
                                                            <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                                                                Tidak boleh kosong
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Link to='/pengajuanstudi' className='btn btn-sm btn-danger'><FaReply /> Kembali</Link>
                                            <button className='btn btn-sm btn-info float-end'><FaSave />  Simpan</button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Form>
                    </div>
            }
        </Layout>
    )
}

export default TambahPengajuan