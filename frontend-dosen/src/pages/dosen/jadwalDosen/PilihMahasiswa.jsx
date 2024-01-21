import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { useLocation, Navigate } from 'react-router-dom'
import { Row, Col, Card, Table, Modal, Accordion, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const PilihMahasiswa = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const [load, setLoad] = useState(false)
    const [Mahasiswa, setMahasiswa] = useState([])
    const [checked, setChecked] = useState([])
    const [keyword, setKeyword] = useState("")

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
        getMahasiswaPerkelas()
        console.log(location.state.kodeKls)
    }, [location, keyword])

    const getMahasiswaPerkelas = async () => {
        try {
            const response = await axios.get(`v1/tugas/getMhsByKelas/${location.state.kodeKls}?search=${keyword}`)
            setMahasiswa(response.data.data)
            // console.log(response.data.data)
        } catch (error) {

        }
    }

    const handleCheck = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item.nim])
        } else {
            setChecked(checked.filter((o) => o !== item.nim))
        }

        const m = Mahasiswa.map((mhs, index) => {
            if (mhs.nim !== item.nim) {
                return mhs
            }
        })

        console.log(m);
    }

    const cariData = (e) => {
        e.preventDefault()
        setKeyword(e ? e.target.value : "")
    }


    return (
        <Layout>
            <title>Tugas Kuliah</title>
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
                                <h2 className='fs-4 font-bold'>Tugas Kuliah</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Row className='mb-3'>
                                                <Col></Col>
                                                <Col lg="3" className='small float-end'>
                                                    <input type="text" onChange={cariData} className='form-control form-control-sm' />
                                                </Col>
                                            </Row>
                                            <div className='table-responsive'>
                                                <Table>
                                                    <thead>
                                                        <tr className='border'>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>#</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>NIM</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Nama</th>
                                                            <th className='fw-bold py-3' style={{ background: '#E9EAE1' }}>Jenis Kelamin</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Mahasiswa.map((item, index) => (
                                                            <tr key={index}
                                                                className="border"
                                                            >
                                                                <th scope="row" className="py-3">
                                                                    <label className="cursor-pointer label justify-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={checked.includes(item.nim)}
                                                                            onChange={(e) => handleCheck(e, item)}
                                                                            className="form-check-input"
                                                                            value=""
                                                                            id="flexCheckDefault"
                                                                        />
                                                                    </label>
                                                                </th>
                                                                <td className='py-3'>{item.nim}</td>
                                                                <td className='py-3'>{item.mahasiswas[0].nama}</td>
                                                                <td className='py-3'>{item.mahasiswas[0].jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
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

export default PilihMahasiswa