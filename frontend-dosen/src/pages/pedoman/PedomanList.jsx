import React, { useEffect, useState } from 'react'
import Layout from "../Layout"
import { Row, Col, Card, Image, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Link, Navigate, useLocation } from "react-router-dom"
import dataBlank from "../../assets/images/noData.svg"
import { Circles } from "react-loader-spinner"
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const PedomanList = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [load, setLoad] = useState(false)
    const [Pedoman, setPedoman] = useState([])

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const getPedomanByLevel = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/pedoman/getByLevel/${user.data.role}`)
                    setPedoman(response.data.data)
                }
            } catch (error) {

            }
        }
        getPedomanByLevel()
    }, [user])

    return (
        <Layout>
            <title>Pedoman</title>
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
                                <h2 className='fs-4 font-bold'>Pedoman</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body className='p-3'>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3 text-center' style={{ background: '#E9EAE1' }}>No</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Judul</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Deskripsi</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tanggal Penerbitan</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Pedoman.length == 0 ?
                                                            <tr className='border'>
                                                                <td colSpan={6} align='center'>
                                                                    <Image src={dataBlank} width={150} />
                                                                    <p className='fw-bold text-muted'>Tidak ada data</p>
                                                                </td>
                                                            </tr> : Pedoman.map((item, index) => (
                                                                <tr key={item.id_pedoman} className='border'>
                                                                    <td className='py-3 text-center'>{index + 1}</td>
                                                                    <td className='py-3'>{item.judul_pedoman}</td>
                                                                    <td className='py-3'>{item.deskripsi}</td>
                                                                    <td className='py-3'>{moment(item.tanggal_terbit).format('DD MMMM YYYY')}</td>
                                                                    <td className='py-3'>
                                                                        <Link to="/detailpedoman" state={{
                                                                            idPedoman: item.id_pedoman
                                                                        }} className='btn btn-sm btn-info'>Detail</Link>
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

export default PedomanList