import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import dataBlank from "../../../assets/images/watch.svg"
import axios from 'axios'
import moment from 'moment'
import { Circles } from 'react-loader-spinner'

const ListPertemuan = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [username, setUsername] = useState("")
    const location = useLocation()
    const [Pertemuan, setPertemuan] = useState([])

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    // useEffect(() => {
    //     console.log(location.state);
    // }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => {
        getJadwalPertemuan()
    }, [location])

    const getJadwalPertemuan = async () => {
        try {
            const response = await axios.get(`v1/presensiMhs/getPertemuanByDosen/${location.state.kodeJadwal}`)
            setPertemuan(response.data.data)
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
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body className='py-3 px-3'>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Matakuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tanggal</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis Pertemuan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Metode</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Pertemuan.map((item, index) => (
                                                            <tr key={item.id_jadwal_pertemuan} className='border'>
                                                                <td className='py-2'>{index + 1}</td>
                                                                <td className='py-2'>{item.pertemuan}</td>
                                                                <td className='py-2'>{location.state.mataKuliah}</td>
                                                                <td className='py-2'>{moment(item.tanggal_pertemuan).format('DD MMMM YYYY')}</td>
                                                                <td className='py-2'><span className='capitalize'>{item.jenis_pertemuan}</span></td>
                                                                <td className='py-2'><span className='capitalize'>{item.metode_pembelajaran}</span></td>
                                                                <td className='py-2'>
                                                                    <Link to='/presensi/mahasiswa'
                                                                        state={{
                                                                            kodeThn: location.state.kodeThn,
                                                                            kodeSmt: location.state.kodeSmt,
                                                                            kodeJen: location.state.kodeJen,
                                                                            kodeFkl: location.state.kodeFkl,
                                                                            kodePro: location.state.kodePro,
                                                                            idProdi: location.state.idProdi,
                                                                            kodeJadwal: location.state.kodeJadwal,
                                                                            kodePert: item.code_jadwal_pertemuan,
                                                                            tanggal: moment(item.tanggal_pertemuan).format('DD MMMM YYYY'),
                                                                            mataKuliah: location.state.mataKuliah,
                                                                            pertemuan: item.pertemuan
                                                                        }}
                                                                        className='btn btn-sm btn-primary capitalize'>absen</Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
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

export default ListPertemuan