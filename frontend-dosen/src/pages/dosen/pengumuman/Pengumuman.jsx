import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Dropdown, DropdownButton, Image, Modal } from 'react-bootstrap'
import dataBlank from "../../../assets/images/noData.svg"
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../../../features/authSlice'
import { Link, Navigate } from 'react-router-dom'
import '../../../assets/css/timeline.css'
import { FaCalendarAlt, FaRegCalendarAlt } from 'react-icons/fa'
import axios from 'axios'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import moment from 'moment'

const Pengumuman = () => {
    const day = new Date().getDate() - 1
    const [role, setRole] = useState("")
    const [Pengumuman, setPengumuman] = useState([])
    const [filter, setFilter] = useState("")
    const [judul, setJudul] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [isi, setIsi] = useState("")
    const [show, setShow] = useState(false)
    const [state, setState] = useState([
        {
            startDate: addDays(new Date(), '-' + day),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (state) {
            setFilter(moment(state[0].startDate).format('YYYY-MM-DD') + '/' + moment(state[0].endDate).format('YYYY-MM-DD'))
        }
    }, [state])

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
    }, [role, filter])

    const getPengumuman = async () => {
        if (role) {
            const response = await axios.get(`v1/pengumuman/getByLevel/${role}/${filter}`)
            setPengumuman(response.data.data)
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = async (e) => {
        const response = await axios.get(`v1/pengumuman/getById/${e}`)
        setJudul(response.data.data.judul_pengumuman)
        setIsi(response.data.data.pengumuman)
        setTanggal(response.data.data.tanggal_pengumuman)
        setShow(true)
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{judul}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><FaRegCalendarAlt /> {moment(tanggal).format('DD MMMM YYYY')}</p>
                        <p>{isi}</p>
                    </Modal.Body>
                </Modal>

                <Row>
                    <Col lg="8" sm="12">
                        <div className="page-header">
                            <h3 className="page-title">Pengumuman</h3>
                        </div>
                    </Col>
                    <Col lg="4" sm="12" className='mb-4'>
                        <DropdownButton variant='light' className='float-right border border-black rounded' autoClose="outside" align="end" title={
                            <div className='inline-flex items-center'>
                                <span>{filter}</span> <FaCalendarAlt className='ms-1 Stext-muted' />
                            </div>
                        }>
                            <Dropdown.Item className='p-0'>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={state}
                                    months={1}
                                    direction='horizontal'
                                />
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className='shadow rounded-4'>
                            <Card.Body>
                                {Pengumuman.length != 0 ?
                                    <div className="timeline">
                                        {Pengumuman.map((item, index) => (
                                            <div key={item.id_pengumuman} className="timeline-row">
                                                <div className="timeline-time">
                                                    {moment(item.tanggal_pengumuman).locale('id', {
                                                        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
                                                    }).format('DD MMMM YYYY')}
                                                </div>
                                                <div className="timeline-content shadow rounded-1">
                                                    <h4 className='text-capitalize'>{item.judul_pengumuman}</h4>
                                                    <p style={{ textAlign: 'justify' }}>{item.pengumuman.substr(1, 108)}<Link className='fst-italic text-decoration-none text-dark' onClick={() => handleShow(item.id_pengumuman)}>....Baca selengkapnya</Link></p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div className='text-center'>
                                        <div>
                                            <Image src={dataBlank} width={200} className='mx-auto' />
                                        </div>
                                        <Card.Text className='fw-bold text-muted'>Tidak ada pengumuman</Card.Text>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            }
        </Layout >
    )
}

export default Pengumuman