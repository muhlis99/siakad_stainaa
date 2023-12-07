import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import gambar from "../../../assets/images/man2.png"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import moment from 'moment'
import { Circles } from "react-loader-spinner"
import Swal from 'sweetalert2'

const Profile = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [detail, setDetail] = useState([])
    const [prevFoto, setPrevFoto] = useState("")
    const [show, setShow] = useState(true)
    const [tampilkan, setTampilkan] = useState(false)
    const [username, setUsername] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [idUser, setIdUser] = useState("")
    const [level, setLevel] = useState("")
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
        getDosenByNip()
    }, [user])

    useEffect(() => {
        prevFotoDiri()
    }, [detail])

    useEffect(() => {
        getDataUser()
    }, [user])

    const getDosenByNip = async () => {
        try {
            const response = await axios.get(`v1/dosen/getByNipy/${user.data.username}`)
            setDetail(response.data.data)
        } catch (error) {

        }
    }

    const prevFotoDiri = async () => {
        try {
            if (detail.foto_diri) {
                await axios.get(`v1/dosen/public/seeImage/dosen/diri/${detail.foto_diri}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevFoto(base64)
                })
            }
        } catch (error) {

        }
    }

    const getDataUser = () => {
        if (user) {
            setUsername(user.data.username)
            setEmailUser(user.data.email)
            setIdUser(user.data.id)
            setLevel(user.data.role)
        }
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            setTampilkan(true)
        } else {
            setTampilkan(false)
        }
    }

    const updateDataUser = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            await axios.put(`v1/registrasi/update/${idUser}`, {
                username: username,
                email: emailUser,
                password: password,
                confirmPassword: confirmPass,
                role: level
            }).then(function (response) {
                setLoad(false)
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {

                })
            })
        } catch (error) {
            setLoad(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                }).then(() => {

                })
            }
        }
    }

    return (
        <Layout>
            <title>Profil Dosen</title>
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
                                <h2 className='fs-4 font-bold'>Profil</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card className='shadow'>
                                        <Card.Body>
                                            <Row>
                                                <Col lg="12">
                                                    <Card className='rounded'>
                                                        <Card.Body className='pb-1'>
                                                            <div className='d-flex flex-wrap flex-sm-nowrap'>
                                                                <div className="me-7 mb-4">
                                                                    <div className='position-relative' style={{ width: '150px' }}>
                                                                        <Image src={gambar} thumbnail />
                                                                    </div>
                                                                </div>
                                                                <div className='flex-grow-1'>
                                                                    <div className='d-flex justify-content-between align-items-start flex-wrap'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <span className='text-[#071437] font-semibold fs-5 text-capitalize'>MASKUR, M. PD</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex align-items-center mb-3'>
                                                                        <span className='text-muted text-[13px] text-capitalize'>1237890</span>
                                                                    </div>
                                                                    <div className='d-flex align-items-center mb-2 gap-3'>
                                                                        <div className='rounded px-2' style={{ border: '1px solid #aaa', borderStyle: 'dashed' }}>
                                                                            <div className='mt-2'>
                                                                                <span className='fs-6 font-semibold'>Jenjang</span>
                                                                                <p className='text-muted font-bold text-capitalize text-[11px]'></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='rounded px-2' style={{ border: '1px solid #aaa', borderStyle: 'dashed' }}>
                                                                            <div className='mt-2'>
                                                                                <span className='fs-6 font-semibold'>Fakultas</span>
                                                                                <p className='text-muted font-bold text-capitalize text-[11px]'></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='rounded px-2' style={{ border: '1px solid #aaa', borderStyle: 'dashed' }}>
                                                                            <div className='mt-2'>
                                                                                <span className='fs-6 font-semibold'>Prodi</span>
                                                                                <p className='text-muted font-bold text-capitalize text-[11px]'></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='grid grid-cols-2'>
                                                                <div
                                                                    className={`flex py-0 justify-center border rounded border-bottom-0 cursor-pointer ${show ? 'bg-primary' : ''}`}
                                                                    onClick={() => setShow(true)}
                                                                >
                                                                    <div className='mt-2'>
                                                                        <h6 className={`${show ? 'text-light' : ''}`}>Detail Diri</h6>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`flex py-0 justify-center border rounded border-bottom-0  cursor-pointer ${show ? '' : 'bg-primary'}`}
                                                                    onClick={() => setShow(false)}
                                                                >
                                                                    <div className='mt-2'>
                                                                        <h6 className={`${show ? '' : 'text-light'}`}>Autentifikasi</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                    {show ?
                                                        <Card className='mt-3'>
                                                            <Card.Header>
                                                                <Card.Title className='mt-2 mb-0 text-muted'>
                                                                    Detail Diri
                                                                </Card.Title>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Row>
                                                                    <Col lg='6'>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>nidn</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.nidn}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>nipy</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.nip_ynaa}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>nama</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.nama}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Tempat Lahir</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.tempat_lahir}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Tanggal Lahir</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{moment(detail.tanggal_lahir).format('DD MMMM YYYY')}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>Jenis Kelamin</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.jenis_kelamin == 'l' ? 'laki-laki' : 'perempuan'}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>email</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder '>{detail.email}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col lg='6'>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>No Handphone</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.no_hp}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>No Telepon</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.no_telepon}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>desa</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.desas && detail.desas[0].nama_desa}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>kecamatan</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.kecamatans && detail.kecamatans[0].nama_kecamatan}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>kabupaten</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.kabupatens && detail.kabupatens[0].nama_kabupaten}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>provinsi</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.provinsis && detail.provinsis[0].nama_provinsi}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mb-3'>
                                                                            <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>negara</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>:</span></Card.Text>
                                                                            </Col>
                                                                            <Col className='p-0'>
                                                                                <Card.Text><span className='text-[10px] lg:text-[13px] fw-bolder text-uppercase'>{detail.negaras && detail.negaras[0].nama_negara}</span></Card.Text>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card>
                                                        :
                                                        <form onSubmit={updateDataUser}>
                                                            <Card className='mt-3'>
                                                                <Card.Header>
                                                                    <Card.Title className='mt-2 mb-0 text-muted'>Autentifikasi</Card.Title>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <Row className='mt-3'>
                                                                        <label for="staticEmail" className="col-lg-3 col-form-label">Username</label>
                                                                        <Col lg="9">
                                                                            <input
                                                                                className="form-control form-control"
                                                                                value={username}
                                                                                onChange={(e) => setUsername(e.target.value)}
                                                                                type="text"
                                                                                placeholder="Username"
                                                                                disabled
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className='mt-3'>
                                                                        <label for="staticEmail" className="col-lg-3 col-form-label">Email</label>
                                                                        <Col lg="9">
                                                                            <input
                                                                                className="form-control form-control"
                                                                                value={emailUser}
                                                                                onChange={(e) => setEmailUser(e.target.value)}
                                                                                type="email"
                                                                                placeholder="Example@gmail.com" disabled />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className='mt-3'>
                                                                        <label for="staticEmail" className="col-lg-3 col-form-label">Password</label>
                                                                        <Col lg="9">
                                                                            <input
                                                                                className="form-control form-control"
                                                                                value={password}
                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                type={tampilkan ? 'text' : 'password'}
                                                                                placeholder=""
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className='mt-3'>
                                                                        <label for="staticEmail" className="col-lg-3 col-form-label">Konfimasi Password</label>
                                                                        <Col lg="9">
                                                                            <input className="form-control form-control"
                                                                                value={confirmPass}
                                                                                onChange={(e) => setConfirmPass(e.target.value)}
                                                                                type={tampilkan ? 'text' : 'password'}
                                                                                placeholder=""
                                                                            />
                                                                            <div className="flex gap-2 mt-3">
                                                                                <input
                                                                                    className="form-check-input"
                                                                                    type="checkbox"
                                                                                    onChange={(e) => handleCheck(e)}
                                                                                />
                                                                                <label className="form-check-label" for="flexCheckChecked">
                                                                                    Tampilkan
                                                                                </label>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Body>
                                                                <Card.Footer>
                                                                    <button className='bg-[#0D6EFD] py-1 px-3 rounded text-white inline-flex items-center mt-2 float-right' ><span>Simpan</span></button>
                                                                </Card.Footer>
                                                            </Card>
                                                        </form>
                                                    }
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

export default Profile