import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate } from "react-router-dom"
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa"
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

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

    const hapusPengajuan = (pengajuanId) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(
                        `v1/pengajuanStudi/deleteMahasiswa/${pengajuanId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getAllPengajuan()
                        });
                    })

                } catch (error) {

                }
            }
        })
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
                                <div className='mb-2'>
                                    <Link to='/tambahpengajuan' className='bg-[#17A2B8] py-1 px-2 rounded no-underline text-white inline-flex items-center'><FaPlus />&nbsp;<span> Tambahkan</span></Link>
                                </div>
                                <div className="table-responsive">
                                    <Table striped>
                                        <thead>
                                            <tr className='border-bottom-3'>
                                                <th className='fw-bold py-3 text-center' style={{ background: '#D5D6C6' }}>#</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Periode</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Status yang diajukan</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Tgl Pengajuan</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Status</th>
                                                <th className='fw-bold py-3' style={{ background: '#D5D6C6' }}>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Pengajuan.length == 0 ?
                                                <tr>
                                                    <td colSpan={6} align='center'>Data Kosong</td>
                                                </tr> :
                                                Pengajuan.map((item, index) => (
                                                    <tr key={item.id_pengajuan_studi} className='border'>
                                                        <th scope='row' className='py-2 text-center'>{index + 1}</th>
                                                        <td className='py-2'>{item.tahunAjarans[0].tahun_ajaran}</td>
                                                        <td className='py-2 text-capitalize'>{item.pengajuan}</td>
                                                        <td className='py-2'>{moment(item.tanggal_pengajuan).format('DD MMMM YYYY')}</td>
                                                        <td className='py-2 text-capitalize'>{item.status == 'tidak' ? 'Dibatalkan' : item.status == 'proses' ? 'proses validasi dosen Wali' : item.status == 'disetujui1' ? 'Disetujui oleh dosen wali' : 'disetujui oleh BAUAK'}</td>
                                                        <td className='py-2'>
                                                            <div className='d-flex gap-1'>
                                                                {item.status == 'tidak' ? <Link className="p-2 rounded-full text-black bg-[#FFC107]" disabled><FaEdit /></Link> : <Link to='/updatepengajuan' state={{ idnya: item.id_pengajuan_studi }} className="p-2 rounded-full text-black bg-[#FFC107]"><FaEdit /></Link>}
                                                                {item.status == 'tidak' ? <button className="p-2 rounded-full text-white bg-[#DC3545]" disabled><FaTimes /></button> : <button onClick={() => hapusPengajuan(item.id_pengajuan_studi)} className={`p-2 rounded-full text-white bg-[#DC3545]`}><FaTimes /></button>}
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
        </Layout >
    )
}

export default Berhenti