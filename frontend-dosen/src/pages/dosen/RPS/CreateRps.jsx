import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { getMe } from "../../../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import moment from 'moment'

const CreateRps = () => {
    const [username, setUsername] = useState("")
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const location = useLocation()
    const [deskripsi, setDeskripsi] = useState("")
    const [fileRps, setFileRps] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        console.log(location.state);
    }, [location])

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
        formData.append('codeMakul', location.state.codeMakul)
        formData.append('codeThn', location.state.codeThn)
        formData.append('codeSmt', location.state.codeSmt)
        formData.append('codeJnj', location.state.codeJnj)
        formData.append('codeFks', location.state.codeFks)
        formData.append('codePrd', location.state.codePrd)
        formData.append('nipy', location.state.nipy)
        formData.append('tanggal', time)
        formData.append('deskripsi', deskripsi)
        formData.append('file_rps', fileRps)
        try {
            await axios.post(`v1/rps/create`, formData, {
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
                                            <Card.Body className='p-3'>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label htmlFor="file" className="col-form-label">File RPS</label>
                                                        <input type="file" onChange={loadFile} className='form-control' />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="desk" className="col-form-label">Deskripsi RPS</label>
                                                        <textarea name="" id="desk" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className='form-control'></textarea>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Link to="/makulDiampu"
                                                    state={{
                                                        codeThn: location.state.codeThn,
                                                        codeSmt: location.state.codeSmt,
                                                        codeJnj: location.state.codeJnj,
                                                        codeFks: location.state.codeFks,
                                                        codePrd: location.state.codePrd,
                                                        idProdi: location.state.idProdi
                                                    }}
                                                    className='btn btn-sm btn-danger'>Kembali</Link>
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

export default CreateRps