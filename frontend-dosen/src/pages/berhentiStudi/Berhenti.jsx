import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"
import { FaInfo, FaTimes } from "react-icons/fa"
import axios from 'axios'

const Berhenti = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [Pengajuan, setPengajuan] = useState([])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getAllPengajuan()
    }, [user])

    const getAllPengajuan = async () => {
        if (user) {
            const response = await axios.get(`v1/pengajuanStudi/allMahasiswa/${user.data.username}`)
            setPengajuan(response.data.data)
        }
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header d-flex gap-2">
                    <h3 className="page-title">Riwayat Studi Mahasiswa</h3>
                </div>
                <Row>
                    <Col>
                        <Card className='shadow rounded-3'>
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table striped>
                                        <thead>
                                            <tr className='border-bottom-3' style={{ background: '#c8ccd0' }}>
                                                <th className='fw-bold py-3 text-center'>#</th>
                                                <th className='fw-bold py-3'>Periode</th>
                                                <th className='fw-bold py-3'>Status yang diajukan</th>
                                                <th className='fw-bold py-3'>Tgl Pengajuan</th>
                                                <th className='fw-bold py-3'>Status</th>
                                                <th className='fw-bold py-3'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Pengajuan.map((item, index) => (
                                                <tr key={item.id_pengajuan_studi} className='border'>
                                                    <th scope='row' className='py-2 text-center'>{index + 1}</th>
                                                    <td className='py-2'>{item.tahunAjarans[0].tahun_ajaran}</td>
                                                    <td className='py-2 text-capitalize'>{item.pengajuan}</td>
                                                    <td className='py-2'>{item.tanggal_pengajuan}</td>
                                                    <td className='py-2 text-capitalize'>{item.status}</td>
                                                    <td className='py-2'>
                                                        <div className='d-flex gap-1'>
                                                            <button className='btn p-1 shadow-sm rounded-circle btn-sm btn-info'><FaInfo /></button>
                                                            <button className='btn p-1 shadow-sm rounded-circle btn-sm btn-danger'><FaTimes /></button>
                                                        </div>
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
            </div>}
        </Layout>
    )
}

export default Berhenti