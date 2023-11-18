import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'

const ListMahasiswa = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [username, setUsername] = useState("")
    const [identitas, setIdentitas] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            setUsername(user.data.username)
        }
    }, [user])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getJenjangPendidikan()
        getFakultas()
        getProdi()
    }, [kodeJenjang, kodeFakultas])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getMhsAsuh()
    }, [kodeJenjang, kodeFakultas, kodeProdi, username])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getFakultas = async () => {
        try {
            if (kodeJenjang != 0) {
                const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
                setFakultas(response.data.data)
            } else {
                setKodeFakultas()
            }
        } catch (error) {

        }
    }

    const getProdi = async () => {
        try {
            if (kodeFakultas != 0) {
                const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
                setProdi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getMhsAsuh = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && username) {
                const response = await axios.get(`v1/pembimbingAkademik/mahasiswaByDosenPembimbing/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${username}`)
                setIdentitas(response.data.identitas)
                setMahasiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" replace />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">KRS Mahasiswa</h3>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <Card className='shadow'>
                                    <Card.Body className='p-4'>
                                        <Row>
                                            <Col lg='4'>
                                                <select className="form-select" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                                    <option value="">Jenjang Pendidikan</option>
                                                    {Jenjang.map((item) => (
                                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg='4'>
                                                <select className="form-select" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                                    <option value="">Fakultas</option>
                                                    {Fakultas.map((item) => (
                                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg='4'>
                                                <select className="form-select" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                                    <option value="">Prodi</option>
                                                    {Prodi.map((item) => (
                                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row className='mt-5'>
                                            {kodeJenjang && kodeFakultas && kodeProdi ?
                                                <Col>
                                                    <Row >
                                                        <Col className='p-0'>
                                                            <div className='table-responsive' >
                                                                <Table hover>
                                                                    <thead>
                                                                        <tr className='border'>
                                                                            <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>#</th>
                                                                            <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}><span>NIM</span></th>
                                                                            <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>Nama</th>
                                                                            <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>Prodi</th>
                                                                            <th className='fw-bold py-2' style={{ background: '#D5D6C6' }}>Aksi</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {Mahasiswa.length > 0 ? Mahasiswa.map((item, index) => (
                                                                            <tr className='border' key={item.id_detail_pembimbing_akademik}>
                                                                                <th scope='row' className='py-2'>{index + 1}</th>
                                                                                <td className='py-2 text-capitalize'>{item.nim}</td>
                                                                                <td className='py-2 text-capitalize'>{item.mahasiswas[0].nama}</td>
                                                                                <td className='py-2 text-capitalize'>{identitas.prodi}</td>
                                                                                <td className='py-2 text-capitalize'>
                                                                                    <Link to="/viewkrs" state={item.nim} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex items-center'><FaSearch className='text-[15px]' /></Link>
                                                                                </td>
                                                                            </tr>
                                                                        )) :
                                                                            <tr className='border'>
                                                                                <td className='py-2' colSpan={5} align='center'>
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
                                                </Col>
                                                : ""}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default ListMahasiswa