import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Modal, Accordion, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const Tugas = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [kodePertemuan, setKodePertemuan] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [namaTugas, setNamaTugas] = useState("")
    const [fileTugas, setFileTugas] = useState("")
    const [tglAkhir, setTglAkhir] = useState("")
    const [kodeKelas, setKodeKelas] = useState("")
    const [checked, setChecked] = useState([])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        const getPertemuanByid = async () => {
            try {
                const response = await axios.get(`v1/jadwalPertemuan/getById/${location.state.idPertemuan}`)
                setKodeKelas(response.data.data.jadwalKuliahs[0].code_kelas)
                setKodePertemuan(response.data.data.code_jadwal_pertemuan)
            } catch (error) {

            }
        }
        getPertemuanByid()
        // console.log(location.state)
    }, [location])

    const loadTugas = (e) => {
        const file = e.target.files[0]
        setFileTugas(file)
    }

    const simpanTugas = async (e) => {
        e.preventDefault()
        if (namaTugas == "") {
            Swal.fire({
                title: 'Judul tugas tidak boleh kosong',
                icon: 'error'
            })
        } else if (deskripsi == "") {
            Swal.fire({
                title: 'Deskripsi tidak boleh kosong',
                icon: 'error'
            })
        } else if (tglAkhir == "") {
            Swal.fire({
                title: 'Tanggal pengumpulan tidak boleh kosong',
                icon: 'error'
            })
        } else {
            setLoad(true)
            const formData = new FormData()
            formData.append('code_jadwal_pertemuan', kodePertemuan)
            formData.append('deskripsi_tugas', deskripsi)
            formData.append('tugas', namaTugas)
            formData.append('file_tugas', fileTugas)
            formData.append('tanggal_akhir', tglAkhir)
            try {
                await axios.post(`v1/tugas/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    setLoad(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate('/pilihmhs', { state: { kodeKls: kodeKelas } })
                        // handleClose()
                        // getJadwal()
                        // setHasil(response.data.data.code_tugas)
                        // handleModal()
                        // setKodePert("")
                    });
                })
            } catch (error) {

            }
        }
    }

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
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Tugas Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <form onSubmit={simpanTugas}>
                                        <Card>
                                            <Card.Body>
                                                <div className='form-group'>
                                                    <label htmlFor="judul" className='h6'>Judul Tugas</label>
                                                    <input id='judul' placeholder='Judul Tugas'
                                                        value={namaTugas} onChange={(e) => setNamaTugas(e.target.value)}
                                                        type="text" className='form-control form-control-sm' />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="deskripsi" className='h6'>Deskripsi Tugas</label>
                                                    <textarea
                                                        id="deskripsi"
                                                        cols="30"
                                                        rows="3"
                                                        placeholder='Deskripsi Tugas'
                                                        value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
                                                        className='form-control form-control-sm'
                                                    ></textarea>
                                                </div>
                                                <div className='form-group'>
                                                    <Row>
                                                        <Col>
                                                            <label htmlFor="lampiran" className='h6'>Lampiran Tugas</label>
                                                            <input id='lampiran' type="file"
                                                                onChange={loadTugas}
                                                                className='form-control form-control-sm' />
                                                        </Col>
                                                        <Col>
                                                            <label htmlFor="tanggal" className='h6'>Tanggal Akhir Pengumpulan</label>
                                                            <input id='tanggal'
                                                                value={tglAkhir} onChange={(e) => setTglAkhir(e.target.value)}
                                                                type="date" className='form-control form-control-sm' />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row>
                                                    <Col>
                                                        <button className='float-end btn btn-info btn-sm'>Simpan</button>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </form>
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default Tugas