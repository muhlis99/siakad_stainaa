import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import dataBlank from "../assets/images/noData.svg"
import { Navigate } from "react-router-dom"
import { FaBookmark, FaFileContract } from 'react-icons/fa'
import { FaGraduationCap } from "react-icons/fa6"
import axios from 'axios'

const Dashboard = () => {
    const [Prodi, SetProdi] = useState([])
    const [Jadwal, setJadwal] = useState([])
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getTotalSKSProdi = async () => {
            try {
                const response = await axios.get(`v1/home/totalSksDanProdi/${user.data.username}`)
                SetProdi(response.data.data)
            } catch (error) {
            }
        }
        getTotalSKSProdi()
    }, [user])

    useEffect(() => {
        const getJadwalNow = async () => {
            try {
                const response = await axios.get(`v1/home/jadwalKuliahNowMahasiswa/${user.data.username}`)
                setJadwal(response.data.data)
            } catch (error) {

            }
        }
        getJadwalNow()
    }, [user])


    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h2 className='fs-4 fw-semibold' >Dashboard</h2>

                </div>
                {/* <Row>
                    <Col lg="6 mb-2 p-1" >
                        <Card className=' rounded-4' >
                            <Card.Body className='p-4'>
                                <h3 style={{ color: '#5E7C60' }}>Hai, Selamat datang!</h3>
                                <Card.Text className='small'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati illum hic quis, quos neque laborum nemo sint impedit accusantium.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="3" className='mb-2  p-1'>
                        <div className="card  rounded-4">
                            <div className="card-body">
                                <Row>
                                    <Col lg="12">
                                        <p className='h2'><FaBookmark /></p>
                                        <h6 className='small fw-bold'>{Prodi.prodi}</h6>
                                        <h6 className="small">Program Studi</h6>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col lg="3" className='mb-2  p-1'>
                        <div className="card rounded-4">
                            <div className="card-body ">
                                <p className='h2'><FaFileContract /></p>
                                <h6 className="card-title">{Prodi.totalSks}</h6>
                                <h6 className="small">Total SKS</h6>
                            </div>
                        </div>
                    </Col>
                </Row> */}

                <Row>
                    <Col>
                        <div className="lg:flex flex-row gap-3">
                            <div className="basis-1/2 bg-white mb-2 rounded-lg shadow-md p-3">
                                <h3 className='text-[#5E7C60]'>Hai, Selamat Datang</h3>
                                <p className='text-base'>
                                    Selamat bergabung menjadi mahasiswa, aplikasi ini membantu anda dalam proses perkuliahan anda meliputi Rencana Studi, Jadwal Kuliah, Hasil Studi dan lain-lain.
                                </p>
                            </div>
                            <div className="basis-1/4 mb-2 bg-white rounded-lg shadow-md flex gap-2 p-3 items-center">
                                <div>
                                    <div className='h-12 w-12 bg-[#7DE274] rounded-full text-white flex justify-center items-center'>
                                        <p className='h2'><FaGraduationCap /></p>
                                    </div>
                                </div>
                                <div>
                                    <h6 className='font-bold'>{Prodi.prodi}</h6>
                                    <span>Program Studi</span>
                                </div>
                            </div>
                            <div className="basis-1/4 mb-2 bg-white rounded-lg shadow-md flex gap-2 p-3 items-center">
                                <div>
                                    <div className='h-12 w-12 bg-[#74C5FF] rounded-full text-white flex justify-center items-center'>
                                        <p className='h4'><FaFileContract /></p>
                                    </div>
                                </div>
                                <div>
                                    <h5 className='font-bold'>{Prodi.totalSks}</h5>
                                    <span>Total SKS</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col lg="12" className='p-1'>
                        <Card className='shadow-sm'>
                            <Card.Header className='fw-bold' style={{ color: '#5E7C60' }}>Jadwal Kuliah Hari ini</Card.Header>
                            <Card.Body className='p-3'>
                                <div className="table-responsive mt-1">
                                    <Table striped>
                                        <thead>
                                            <tr style={{ background: '#E9EAE1' }}>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>#</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Jam</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Mata Kuliah</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Jenis Pertemuan</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Pembelejaran</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Jadwal.length != 0 ?
                                                Jadwal.map((item, index) => (
                                                    <tr key={item.id_jadwal_pertemuan} className='border'>
                                                        <th scope='row' className='py-2'>{index + 1}</th>
                                                        <td className='py-2'>{item.jadwalKuliahs[0].jam_mulai + ' - ' + item.jadwalKuliahs[0].jam_selesai}</td>
                                                        <td className='py-2'>{item.jadwalKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                        <td className='py-2 text-uppercase'>{item.jenis_pertemuan}</td>
                                                        <td className='py-2'>{item.metode_pembelajaran}</td>
                                                    </tr>
                                                )) :
                                                <tr className='border'>
                                                    <td colSpan={5} align='center'>
                                                        <Image src={dataBlank} thumbnail width={150} />
                                                        <p className='fw-bold text-muted'>Tidak Ada Jadwal Hari Ini</p>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>}

        </Layout >
    )
}

export default Dashboard