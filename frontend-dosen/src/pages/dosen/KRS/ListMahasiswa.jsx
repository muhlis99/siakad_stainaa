import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { Circles } from "react-loader-spinner"

const ListMahasiswa = () => {
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [username, setUsername] = useState("")
    const [tahunAngkatan, setTahunAngkatan] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

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
        getYearNow()
    }, [])

    useEffect(() => {
        getMhsAsuh()
    }, [kodeJenjang, kodeFakultas, kodeProdi, username, tahunAngkatan])

    const getUserDosen = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/pembimbingAkademik/verifikasiDosenPembimbing/${user.data.username}`)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeProdi(response.data.data.code_prodi)
            }
        } catch (error) {

        }
    }

    const getYearSelected = (e) => {
        setTahunAngkatan(e)
    }

    const getYearNow = () => {
        const d = new Date()
        let year = d.getFullYear()
        setTahunAngkatan(year)
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = 2021; tahun <= year; tahun++) {
        th.push(
            <li className="nav-item" key={tahun}>
                <span className={`border cursor-pointer ${tahun == tahunAngkatan ? '' : 'text-dark'} nav-link ${tahun == tahunAngkatan ? 'active' : ''}`} onClick={() => getYearSelected(tahun)} aria-current="page">{tahun}</span>
            </li>
        )
    }

    const getMhsAsuh = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && username) {
                const response = await axios.get(`v1/pembimbingAkademik/mahasiswaByDosenPembimbing/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}/${tahunAngkatan}`)
                setIdentitas(response.data.identitas)
                setMahasiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>KRS Mahasiswa</title>
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
                                <h2 className='fs-4 font-bold'>KRS Mahasiswa</h2>
                            </div>
                            <div>
                                <Row>
                                    <Col>
                                        <Card className="mt-3 shadow">
                                            <Card.Body className='p-3'>
                                                <Row className='mb-2'>
                                                    <Col>
                                                        <ul className="nav nav-pills nav-fill">
                                                            {th}
                                                        </ul>
                                                    </Col>
                                                </Row>
                                                <Row >
                                                    <Col>
                                                        <div className='table-responsive' >
                                                            <Table hover>
                                                                <thead>
                                                                    <tr className='border'>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>No</th>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>NIM</th>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Nama</th>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenjang</th>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Fakultas</th>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Prodi</th>
                                                                        <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Mahasiswa.length > 0 ? Mahasiswa.map((item, index) => (
                                                                        <tr className='border' key={item.id_detail_pembimbing_akademik}>
                                                                            <td className='py-3'>{index + 1}</td>
                                                                            <td className='py-3 text-capitalize'>{item.nim}</td>
                                                                            <td className='py-3 text-capitalize'>{item.mahasiswas[0].nama}</td>
                                                                            <td className='py-3 text-capitalize'>{identitas.jenjang_pendidikan}</td>
                                                                            <td className='py-3 text-capitalize'>{identitas.fakultas}</td>
                                                                            <td className='py-3 text-capitalize'>{identitas.prodi}</td>
                                                                            <td className='py-3 text-capitalize'>
                                                                                <Link to="/viewkrs" state={item.nim} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex items-center'><FaSearch className='text-[15px]' /></Link>
                                                                            </td>
                                                                        </tr>
                                                                    )) :
                                                                        <tr className='border'>
                                                                            <td className='py-3' colSpan={5} align='center'>
                                                                                <Image src={dataBlank} thumbnail width={150} />
                                                                                <p className='fw-bold text-muted'>Tidak Ada Data</p>
                                                                            </td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row >
                            </div >
                        </div >
                    }
                </>
            }
        </Layout >
    )
}

export default ListMahasiswa