import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Image } from 'react-bootstrap'
import gambar from "../../../assets/images/man2.png"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import { FaSave } from 'react-icons/fa'

const Profil = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [nim, setNim] = useState("")
    const [noKk, setNoKk] = useState("")
    const [nik, setNik] = useState("")
    const [nama, setNama] = useState("")
    const [tmpLahir, setTmpLahir] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [jenis, setJenis] = useState("")
    const [email, setEmail] = useState("")
    const [noHp, setNoHp] = useState("")
    const [noTelp, setNoTelp] = useState("")
    const [nisn, setNisn] = useState("")
    const [penKps, setPenKps] = useState("")
    const [noKps, setNoKps] = useState("")
    const [npwp, setNpwp] = useState("")
    const [kodeJalurPen, setKodeJalurPen] = useState("")
    const [jalurPen, setJalurPen] = useState("")
    const [kodeJenisPen, setKodeJenisPen] = useState("")
    const [jenisPen, setJenisPen] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [jalan, setJalan] = useState("")
    const [dusun, setDusun] = useState("")
    const [rtRw, setRtRw] = useState("")
    const [kodePos, setKodePos] = useState("")
    const [kodeJenTin, setKodeJenTin] = useState("")
    const [jenTin, setJenTin] = useState("")
    const [kodeAlat, setKodeAlat] = useState("")
    const [alat, setAlat] = useState("")
    const [desa, setDesa] = useState("")
    const [kecamatan, setKecamatan] = useState("")
    const [kabupaten, setKabupaten] = useState("")
    const [provinsi, setProvinsi] = useState("")
    const [negara, setNegara] = useState("")
    const [nikA, setNikA] = useState("")
    const [nmA, setNmA] = useState("")
    const [tglLahirA, setTglLahirA] = useState("")
    const [kodeKerjaA, setKodeKerjaA] = useState("")
    const [pekerjaanA, setPekerjaanA] = useState("")
    const [kodeHasilA, setKodeHasilA] = useState("")
    const [hasilA, setHasilA] = useState("")
    const [kodeDidikA, setKodeDidikA] = useState("")
    const [didikA, setDidikA] = useState("")
    const [nikI, setNikI] = useState("")
    const [nmI, setNmI] = useState("")
    const [tglLahirI, setTglLahirI] = useState("")
    const [kodeKerjaI, setKodeKerjaI] = useState("")
    const [pekerjaanI, setPekerjaanI] = useState("")
    const [kodeHasilI, setKodeHasilI] = useState("")
    const [hasilI, setHasilI] = useState("")
    const [kodeDidikI, setKodeDidikI] = useState("")
    const [didikI, setDidikI] = useState("")
    const [nikW, setNikW] = useState("")
    const [nmW, setNmW] = useState("")
    const [tglLahirW, setTglLahirW] = useState("")
    const [kodeKerjaW, setKodeKerjaW] = useState("")
    const [pekerjaanW, setPekerjaanW] = useState("")
    const [kodeHasilW, setKodeHasilW] = useState("")
    const [hasilW, setHasilW] = useState("")
    const [kodeDidikW, setKodeDidikW] = useState("")
    const [didikW, setDidikW] = useState("")
    const [foto, setFoto] = useState("")
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
        const getDataProfil = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                    setNim(response.data.data.nim)
                    setNoKk(response.data.data.no_kk)
                    setNik(response.data.data.nik)
                    setNama(response.data.data.nama)
                    setTmpLahir(response.data.data.tempat_lahir)
                    setTglLahir(response.data.data.tanggal_lahir)
                    setJenis(response.data.data.jenis_kelamin)
                    setEmail(response.data.data.email)
                    setNoHp(response.data.data.no_hp)
                    setNoTelp(response.data.data.no_telepon)
                    setNisn(response.data.data.nisn)
                    setPenKps(response.data.data.penerima_kps)
                    setNoKps(response.data.data.no_kps)
                    setNpwp(response.data.data.npwp)
                    setKodeJalurPen(response.data.data.jalur_pendaftaran)
                    setKodeJenisPen(response.data.data.jenis_pendaftaran)
                    setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                    setFakultas(response.data.data.fakultas[0].nama_fakultas)
                    setProdi(response.data.data.prodis[0].nama_prodi)
                    setJalan(response.data.data.jalan)
                    setDusun(response.data.data.dusun)
                    setRtRw(response.data.data.rt + "/" + response.data.data.rw)
                    setKodePos(response.data.data.kode_pos)
                    setKodeJenTin(response.data.data.jenis_tinggal)
                    setKodeAlat(response.data.data.alat_transportasi)
                    setDesa(response.data.data.desas[0].nama_desa)
                    setKecamatan(response.data.data.kecamatans[0].nama_kecamatan)
                    setKabupaten(response.data.data.kabupatens[0].nama_kabupaten)
                    setProvinsi(response.data.data.provinsis[0].nama_provinsi)
                    setNegara(response.data.data.negaras[0].nama_negara)
                    setNikA(response.data.data.nik_ayah)
                    setNmA(response.data.data.nama_ayah)
                    setTglLahirA(response.data.data.tanggal_lahir_ayah)
                    setKodeKerjaA(response.data.data.pekerjaan_ayah)
                    setKodeHasilA(response.data.data.penghasilan_ayah)
                    setKodeDidikA(response.data.data.pendidikan_ayah)
                    setNikI(response.data.data.nik_ibu)
                    setNmI(response.data.data.nama_ibu)
                    setTglLahirI(response.data.data.tanggal_lahir_ibu)
                    setKodeKerjaI(response.data.data.pekerjaan_ibu)
                    setKodeHasilI(response.data.data.penghasilan_ibu)
                    setKodeDidikI(response.data.data.pendidikan_ibu)
                    setNikW(response.data.data.nik_wali)
                    setNmW(response.data.data.nama_wali)
                    setTglLahirW(response.data.data.tanggal_lahir_wali)
                    setKodeKerjaW(response.data.data.pekerjaan_wali)
                    setKodeHasilW(response.data.data.penghasilan_wali)
                    setKodeDidikW(response.data.data.pendidikan_wali)
                    setFoto(response.data.data.foto_diri)
                }
            } catch (error) {

            }
        }

        getDataProfil()
    }, [user])

    useEffect(() => {
        prevFotoDiri()
    }, [foto])

    useEffect(() => {
        getDataUser()
    }, [user])

    const prevFotoDiri = async () => {
        try {
            if (foto) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/diri/${foto}`, {
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

    const handleCheck = (e) => {
        if (e.target.checked) {
            setTampilkan(true)
        } else {
            setTampilkan(false)
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
            <title>Profil Mahasiswa</title>
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
                                    wrapperClassName=""
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
                                    <Card>
                                        <Card.Body>
                                            <Row>
                                                <Col lg="12">
                                                    <Card className='rounded'>
                                                        <Card.Body className='pb-1'>
                                                            <div className='d-flex flex-wrap flex-sm-nowrap'>
                                                                <div className="me-7 mb-4">
                                                                    <div className='position-relative' style={{ width: '150px' }}>
                                                                        {prevFoto ? <Image src={`data:;base64,${prevFoto}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                                    </div>
                                                                </div>
                                                                <div className='flex-grow-1'>
                                                                    <div className='d-flex justify-content-between align-items-start flex-wrap'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <span className='text-[#071437] font-semibold fs-5 text-capitalize'>{nama}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='d-flex align-items-center mb-3'>
                                                                        <span className='text-muted text-[13px] text-capitalize'>{nim}</span>
                                                                    </div>
                                                                    <div className='d-flex align-items-center mb-2 gap-3'>
                                                                        <div className='rounded px-2' style={{ border: '1px solid #aaa', borderStyle: 'dashed' }}>
                                                                            <div className='mt-2'>
                                                                                <span className='fs-6 font-semibold'>Jenjang</span>
                                                                                <p className='text-muted font-bold text-capitalize text-[11px]'>{jenjang}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='rounded px-2' style={{ border: '1px solid #aaa', borderStyle: 'dashed' }}>
                                                                            <div className='mt-2'>
                                                                                <span className='fs-6 font-semibold'>Fakultas</span>
                                                                                <p className='text-muted font-bold text-capitalize text-[11px]'>{fakultas}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='rounded px-2' style={{ border: '1px solid #aaa', borderStyle: 'dashed' }}>
                                                                            <div className='mt-2'>
                                                                                <span className='fs-6 font-semibold'>Prodi</span>
                                                                                <p className='text-muted font-bold text-capitalize text-[11px]'>{prodi}</p>
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
                                                    {
                                                        show ?
                                                            <Card className='mt-3'>
                                                                <Card.Header>
                                                                    <Card.Title className='mt-2 mb-0 text-muted'>Detail Diri</Card.Title>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Col lg="6">
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>nim</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{nim}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>nisn</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{nisn}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>no kk</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{noKk}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>nik</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{nik}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>nama</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{nama}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>tempat lahir</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{tmpLahir}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>tanggal lahir</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{tglLahir}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>jenis kelamin</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{jenis == 'l' ? 'laki-laki' : 'perempuan'}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col lg="6">
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>email</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fw-bolder'>{email}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>no hp/wa</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{noHp}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>no telepon</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{noTelp}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>desa</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{desa}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>kecamatan</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{kecamatan}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>kabuapten</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{kabupaten}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>provinsi</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{provinsi}</span></Card.Text>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row className='mb-3'>
                                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>negara</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                                </Col>
                                                                                <Col className='p-0'>
                                                                                    <Card.Text><span className='text-muted fs-6 fw-bolder text-uppercase'>{negara}</span></Card.Text>
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
                                                                        <Card.Title className='mt-2 mb-0'>Autentifikasi</Card.Title>
                                                                    </Card.Header>
                                                                    <Card.Body>
                                                                        <Row className='mt-3'>
                                                                            <label for="staticEmail" className="col-lg-3 col-form-label">Username</label>
                                                                            <Col lg="9">
                                                                                <input className="form-control form-control" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" disabled />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mt-3'>
                                                                            <label for="staticEmail" className="col-lg-3 col-form-label">Email</label>
                                                                            <Col lg="9">
                                                                                <input className="form-control form-control" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} type="email" placeholder="Example@gmail.com" disabled />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mt-3'>
                                                                            <label for="staticEmail" className="col-lg-3 col-form-label">Password</label>
                                                                            <Col lg="9">
                                                                                <input className="form-control form-control" value={password} onChange={(e) => setPassword(e.target.value)} type={tampilkan ? 'text' : 'password'} placeholder="" />
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className='mt-3'>
                                                                            <label for="staticEmail" className="col-lg-3 col-form-label">Konfimasi Password</label>
                                                                            <Col lg="9">
                                                                                <input className="form-control form-control" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type={tampilkan ? 'text' : 'password'} placeholder="" />
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
        </Layout >
    )
}

export default Profil