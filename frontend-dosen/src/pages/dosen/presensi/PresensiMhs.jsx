import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import rfidIcon from "../../../assets/images/rfid.png"
import ProgressBar from "@ramonak/react-progress-bar"
import axios from 'axios'
import moment from 'moment'
import { Circles } from 'react-loader-spinner'
import Swal from 'sweetalert2'

const PresensiMhs = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [kodeRfid, setKodeRfid] = useState("")
    const [jumlahPresensi, setJumlahPresensi] = useState("")
    const [jumlahMhs, setJumlahMs] = useState("")

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500)
    }, [])

    useEffect(() => {
        console.log(location.state);
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => {
        getJumlahPresensi()
    }, [location])


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
                Swal.fire({
                    title: 'Anda berhasil melakukan absen',
                    icon: 'success',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    setKodeRfid("")
                    getJumlahPresensi()
                    document.getElementById('rfid').focus()
                })
            })
        } catch (error) {
            Swal.fire({
                title: error.response.data.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            }).then(function (result) {
                setKodeRfid("")
                document.getElementById('rfid').focus()
            })

        }
    }

    const getJumlahPresensi = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/progresPresensi/${location.state.kodePert}/${location.state.kodeThn}/${location.state.kodeSmt}/${location.state.kodeJen}/${location.state.kodeFkl}/${location.state.kodePro}`)
            setJumlahMs(response.data.data.jumlah_mahasiswa)
            setJumlahPresensi(response.data.data.jumlah_mahasiswa_presensi)
        } catch (error) {

        }
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
                                        <ProgressBar
                                            completed={`${jumlahPresensi}`}
                                            maxCompleted={jumlahMhs}
                                            bgColor='#17A2B8'
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
                                <Col className='text-center'>
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
                                    }}>Kembali ke List Pertemuan</Link>
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