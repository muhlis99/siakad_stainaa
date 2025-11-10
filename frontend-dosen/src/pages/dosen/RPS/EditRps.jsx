import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { getMe } from "../../../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import moment from 'moment'
import Swal from 'sweetalert2'

const EditRps = () => {
    const [username, setUsername] = useState("")
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const location = useLocation()
    const [detail, setDetail] = useState([])
    const [Jenjang, setJenjang] = useState("")
    const [Fakultas, setFakultas] = useState("")
    const [makul, setMakul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [fileRps, setFileRps] = useState("")
    const navigate = useNavigate()

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
        getUserDosen()
    }, [user])

    useEffect(() => {
        getRpsById()
    }, [location])

    const getUserDosen = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/pembimbingAkademik/verifikasiDosenPembimbing/${user.data.username}`)
                // setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                // setKodeFakultas(response.data.data.code_fakultas)
                // setKodeProdi(response.data.data.code_prodi)
            }
        } catch (error) {

        }
    }

    const getRpsById = async () => {
        try {
            if (location) {
                const response = await axios.get(`v1/rps/getById/${location.state.idRps}`)
                setDetail(response.data.data)
                setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
                setMakul(response.data.data.mataKuliahs[0].nama_mata_kuliah)
                setDeskripsi(response.data.data.deskripsi)
            }
        } catch (error) {

        }
    }

    const loadFile = (e) => {
        const file = e.target.files[0]
        setFileRps(file)
    }

    const upload = async (e) => {
        e.preventDefault()
        var date1 = moment()
        var time = moment(date1).format('YYYY-MM-DD');
        setLoad(true)
        const formData = new FormData()
        formData.append('tanggal', time)
        formData.append('deskripsi', deskripsi)
        formData.append('file_rps', fileRps)
        try {
            await axios.put(`v1/rps/update/${location.state.idRps}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(function (response) {
                setLoad(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate('/listRps')
                });
            })
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>RPS</title>
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
                                <h2 className='fs-4 font-bold'>RPS</h2>
                            </div>
                            <Row>
                                <Col>
                                    <form onSubmit={upload}>
                                        <Card>
                                            <Card.Header>
                                                <h3 className="card-title">Edit RPS</h3>
                                            </Card.Header>
                                            <Card.Body className='p-3'>
                                                <Row>
                                                    <div className="col-md-4">
                                                        <label htmlFor="jenjang" className='col-form-label'>Jenjang</label>
                                                        <input type="text" className='form-control' id='jenjang' readOnly value={Jenjang} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="fakultas" className='col-form-label'>Fakultas</label>
                                                        <input type="text" className='form-control' id='fakultas' readOnly value={Fakultas} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="kode" className='col-form-label'>Kode Mata Kuliah</label>
                                                        <input type="text" className='form-control' id='kode' readOnly value={detail.code_mata_kuliah} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="makul" className='col-form-label'>Mata Kuliah</label>
                                                        <input type="text" className='form-control' id='makul' readOnly value={makul} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="file" className='col-form-label'>File RPS</label>
                                                        <input type="file" onChange={loadFile} className='form-control' id='file' />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="desk" className="col-form-label">Deskripsi RPS</label>
                                                        <textarea name="" id="desk" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className='form-control'></textarea>
                                                    </div>
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Link to="/listRps" className='btn btn-sm btn-danger'>Kembali</Link>
                                                <button className='btn btn-sm btn-primary float-end'>Simpan</button>
                                            </Card.Footer>
                                        </Card>
                                    </form>
                                </Col>
                            </Row>
                        </div >
                    }
                </>
            }
        </Layout>
    )
}

export default EditRps