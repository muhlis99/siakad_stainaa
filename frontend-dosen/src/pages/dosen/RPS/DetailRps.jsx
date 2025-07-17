import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import { getMe } from "../../../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import dataBlank from "../../../assets/images/noData.svg"
import { Link, Navigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"

const DetailRps = () => {
    const [username, setUsername] = useState("")
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const location = useLocation()
    const [detail, setDetail] = useState([])
    const [Jenjang, setJenjang] = useState("")
    const [Fakultas, setFakultas] = useState("")

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
        getRpsById()
    }, [location])

    const getUserDosen = async () => {
        try {
            if (user) {
                const response = await axios.get(`v1/pembimbingAkademik/verifikasiDosenPembimbing/${user.data.username}`)
                // setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                // setKodeFakultas(response.data.data.code_fakultas)
                // setKodeProdi(response.data.data.code_prodi)
            }
        } catch (error) {

        }
    }

    const getRpsById = async () => {
        try {
            if (location) {
                const response = await axios.get(`v1/rps/getById/${location.state.idRps}`)
                setDetail(response.data.data)
                setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
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
                                            <table>
                                                <tr>
                                                    <td>Jenjang</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{Jenjang}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fakultas</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{Fakultas}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kode Mata Kuliah</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{detail.code_mata_kuliah}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mata Kuliah</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td>{detail.code_mata_kuliah}</td>
                                                </tr>
                                            </table>
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

export default DetailRps