import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"
import "../../assets/css/timeline.css"
import { FaBullhorn } from 'react-icons/fa'
import axios from 'axios'

const ListPengumuman = () => {
    const [role, setRole] = useState("")
    const [Pengumuman, setPengumuman] = useState("")
    const [filterBulan, setFilterBulan] = useState("")
    const [filterTahun, setFilterTahun] = useState("")
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setRole(user.data.role)
        } else {
            setRole("")
        }
    }, [user])

    useEffect(() => {
        getPengumuman()
    }, [role])

    useEffect(() => {
        const u = new Date()
        setFilterBulan('0' + u.getMonth())
        setFilterTahun(u.getFullYear());

    }, [])

    const color = ['bg-secondary', 'bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info']

    const getPengumuman = async () => {
        if (role) {
            const response = await axios.get(`v1/pengumuman/getByLevel/${role}`)
            setPengumuman(response.data.data)
        }
    }

    const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const bl = []
    for (let bulan = 0; bulan < 12; bulan++) {
        if (bulan < 10) {
            bl.push(<option key={bulan} value={"0" + bulan}>{namaBulan[bulan]}</option>)
        } else {
            bl.push(<option key={bulan} value={bulan}>{namaBulan[bulan]}</option>)
        }
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = year - 5; tahun <= year; tahun++) {
        th.push(<option key={tahun} value={tahun}>{tahun}</option>)
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <Row>
                    <Col lg="8" sm="12">
                        <div className="page-header">
                            <h3 className="page-title">Pengumuman</h3>
                        </div>
                    </Col>
                    <Col lg="4" sm="12" className='mb-4 d-flex gap-2'>
                        <select className="form-select" aria-label="Default select example" value={filterBulan} onChange={(e) => setFilterBulan(e.target.value)}>
                            {/* <option selected>Bulan</option> */}
                            {bl}
                        </select>
                        <select className="form-select" aria-label="Default select example" value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
                            {/* <option selected>Tahun</option> */}
                            {th}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <section className="">
                            <ul className="timeline-with-icons">
                                {Pengumuman.length != 0 ? Pengumuman.map((item, index) => (
                                    <li key={item.id_pengumuman} className="timeline-item mb-3">
                                        <span className={`timeline-icon ${color[index]}`}>
                                            <FaBullhorn className='fa-sm fa-fw' />
                                        </span>
                                        <Card className='shadow ms-3'>
                                            <Card.Body>
                                                <p className="h5 fw-bold">{item.judul_pengumuman}</p>
                                                <p className="text-muted mb-2 fw-bold">{item.tanggal_pengumuman}</p>
                                                <p className="text-muted">
                                                    {item.pengumuman}
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </li>
                                )) : ""}
                            </ul>
                        </section>
                    </Col>
                </Row>
            </div>
            }
        </Layout>
    )
}

export default ListPengumuman