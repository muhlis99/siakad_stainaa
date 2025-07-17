import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { getMe } from "../../../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"
import ReactPaginate from 'react-paginate'

const AllRps = () => {
    const [allRps, setAllRps] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [username, setUsername] = useState("")
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
        getAllRps()
    }, [username])

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

    const getAllRps = async () => {
        try {
            if (username) {
                const response = await axios.get(`v1/rps/all/${username}`)
                // console.log(response.data.data);
                setAllRps(response.data.data)
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>RPS</title>
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
                                <h2 className='fs-4 font-bold'>RPS</h2>
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
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Mata Kuliah</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Prodi</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Tahun Ajaran</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Semester</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allRps.map((item, index) => (
                                                            <tr key={item.id_rps} className='border'>
                                                                <td className='py-3 text-center'>{index + 1}</td>
                                                                <td className='py-3'>{item.code_mata_kuliah}</td>
                                                                <td className='py-3'>{item.prodis[0].nama_prodi}</td>
                                                                <td className='py-3'>{item.tahunAjarans[0].tahun_ajaran}</td>
                                                                <td className='py-3'>Semester {item.semesters[0].semester}</td>
                                                                <td className='py-3'>
                                                                    <Link to="/detailRps" state={{
                                                                        idRps: item.id_rps
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
                        </div >
                    }
                </>
            }
        </Layout>
    )
}

export default AllRps