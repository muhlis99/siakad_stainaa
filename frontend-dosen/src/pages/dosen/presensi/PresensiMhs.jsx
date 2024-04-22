import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Image, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import rfidIcon from "../../../assets/images/rfid.png"
import noprofil from "../../../assets/images/foto.svg"
import axios from 'axios'
import { Circles } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import ProgresBar from './ProgresBar'

const PresensiMhs = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    // const [username, setUsername] = useState("")
    const [load, setLoad] = useState(false)
    const [kodeRfid, setKodeRfid] = useState("")
    const [jumlahPresensi, setJumlahPresensi] = useState("")
    const [jumlahMhs, setJumlahMs] = useState("")
    const [nim, setNim] = useState("")
    const [nama, setNama] = useState("")
    const [foto, setFoto] = useState("")
    const [preview, setPreview] = useState("")
    const [pesan, setPesan] = useState("")
    const [show, setShow] = useState(false)
    const [progres, setProgres] = useState("")
    const location = useLocation()

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    // useEffect(() => {
    //     if (user) {
    //         setUsername(user.data.username)
    //     }
    // }, [user])

    useEffect(() => {
        getJumlahPresensi()
    }, [location])

    useEffect(() => {
        getMahasiswaByNim()
    }, [nim])

    useEffect(() => {
        prevFoto()
    }, [foto])

    useEffect(() => {
        berhasil()
    }, [nama])

    useEffect(() => {
        getPersenAbsen()
    }, [jumlahMhs, jumlahPresensi])


    const simpanPresensi = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/presensiMhs/presensiByRfid`, {
                codeRfid: kodeRfid,
                codeThn: location.state.kodeThn,
                codeSmt: location.state.kodeSmt,
                codeJnj: location.state.kodeJen,
                codeFks: location.state.kodeFkl,
                codePrd: location.state.kodePro,
                codeJadper: location.state.kodePert
            }).then(function (response) {
                setNim(response.data.data)
                setPesan(response.data.message)
                setKodeRfid("")
                getPersenAbsen()
                // Swal.fire({
                //     title: 'Anda berhasil melakukan absen',
                //     icon: 'success',
                //     text: response.data.message,
                //     showConfirmButton: false,
                //     timer: 1000
                // }).then(() => {
                //     setKodeRfid("")
                //     getJumlahPresensi()
                //     document.getElementById('rfid').focus()
                // })
            })
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            }).then(function () {
                setKodeRfid("")
                document.getElementById('rfid').focus()
            })

        }
    }

    const getJumlahPresensi = async () => {
        try {
            if (location.state.kodePert, location.state.kodeThn, location.state.kodeSmt, location.state.kodeJen, location.state.kodeFkl, location.state.kodePro) {
                const response = await axios.get(`v1/presensiMhs/progresPresensi/${location.state.kodePert}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
                setJumlahMs(response.data.data.jumlah_mahasiswa)
                setJumlahPresensi(response.data.data.jumlah_mahasiswa_presensi)
            }
        } catch (error) {

        }
    }

    const getMahasiswaByNim = async () => {
        try {
            if (nim) {
                const response = await axios.get(`v1/mahasiswa/getByNim/${nim}`)
                setNama(response.data.data.nama)
                setFoto(response.data.data.foto_diri)
            }
        } catch (error) {

        }
    }

    const prevFoto = async () => {
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
                    setPreview(base64)
                })
            }
        } catch (error) {

        }
    }

    const berhasil = () => {
        if (nama) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
                setKodeRfid("")
                setNim("")
                setNama("")
                setPesan("")
                setFoto("")
                setPreview("")
                getJumlahPresensi()
                document.getElementById('rfid').focus()
            }, 1500)
        }
    }

    const getPersenAbsen = () => {
        let jumlahSemuaMhs = jumlahMhs
        let jumlahAbsen = jumlahPresensi
        let persen = jumlahAbsen / jumlahSemuaMhs * 100
        var persenan = persen.toFixed(2)
        setProgres(persenan);
    }

    return (
        <Layout>
            <title>Presensi</title>
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
                            <Modal
                                show={show}
                                // onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                size='md'
                                centered
                            >
                                <Modal.Body className='py-5'>
                                    <Row>
                                        <Col className='flex justify-center'>
                                            <Image src={preview ? `data:;base64,${preview}` : noprofil} className='mt-1' width={150} />
                                        </Col>
                                    </Row>
                                    <Row className='mt-4'>
                                        <Col className='text-center'>
                                            <h4 className='fw-bold'>{nama}</h4>
                                        </Col>
                                    </Row>
                                    <Row className='mt-1'>
                                        <Col className='text-center'>
                                            <span>{pesan}</span>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Modal>
                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Presensi</h2>
                            </div>
                            <Row className='mb-3'>
                                <Col>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Matakuliah</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{location.state.mataKuliah}</td>
                                            </tr>
                                            <tr>
                                                <td>Pertemuan</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>Pertemuan ke {location.state.pertemuan}</td>
                                            </tr>
                                            <tr>
                                                <td>Tanggal</td>
                                                <td>&nbsp;:&nbsp;</td>
                                                <td>{location.state.tanggal}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                            <Row>
                                <Col className=''>
                                    <div className='w-full lg:w-1/2 mx-auto text-center'>
                                        <ProgresBar
                                            bgcolor="#17A2B8"
                                            progress={`${progres}`}
                                            height={22}
                                            jumlahMahasiswaAbsen={jumlahPresensi}
                                        />
                                        <p className='lg:text-xl mt-3 text-muted'>{jumlahPresensi} dari {jumlahMhs} Mahasiswa</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='flex justify-center'>
                                        <div className='w-full lg:w-1/6'>
                                            <div className=''>
                                                <Image src={rfidIcon} className='mt-1' />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='flex justify-center gap-1'>
                                    <Link className='btn btn-sm btn-danger' to="/presensi/pertemuan" state={{
                                        kodeThn: location.state.kodeThn,
                                        kodeSmt: location.state.kodeSmt,
                                        kodeJen: location.state.kodeJen,
                                        kodeFkl: location.state.kodeFkl,
                                        kodePro: location.state.kodePro,
                                        idProdi: location.state.idProdi,
                                        kodeJadwal: location.state.kodeJadwal,
                                        mataKuliah: location.state.mataKuliah,
                                        jenisMk: location.state.jenisMk,
                                        bobot: location.state.bobot,
                                        sks: location.state.sks,
                                        kodeMk: location.state.kodeMk
                                    }}>Kembali</Link>
                                    <Link className='btn btn-sm btn-info' to="/presensi/validasi"
                                        state={{
                                            kodeThn: location.state.kodeThn,
                                            kodeSmt: location.state.kodeSmt,
                                            kodeJen: location.state.kodeJen,
                                            kodeFkl: location.state.kodeFkl,
                                            kodePro: location.state.kodePro,
                                            idProdi: location.state.idProdi,
                                            kodeJadwal: location.state.kodeJadwal,
                                            mataKuliah: location.state.mataKuliah,
                                            jenisMk: location.state.jenisMk,
                                            kodeMk: location.state.kodeMk,
                                            bobot: location.state.bobot,
                                            sks: location.state.sks,
                                            kodePert: location.state.kodePert,
                                            kodeMk: location.state.kodeMk,
                                            tanggal: location.state.tanggal,
                                            pertemuan: location.state.pertemuan,
                                            hal: 'presensi'
                                        }}
                                    >validasi</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <form onSubmit={simpanPresensi}>
                                        <input
                                            type="text"
                                            autoFocus
                                            id='rfid'
                                            className='caret-transparent'
                                            value={kodeRfid}
                                            onChange={(e) => setKodeRfid(e.target.value)}
                                            style={{ background: '#E9EAE1', color: '#E9EAE1' }}
                                            autoComplete='off'
                                        />
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

export default PresensiMhs