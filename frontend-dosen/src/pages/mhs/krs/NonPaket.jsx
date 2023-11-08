import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Image } from 'react-bootstrap'
import dataBlank from "../../../assets/images/maintenance.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"

const NonPaket = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <Row className=''>
                    <Col>
                        <div className='flex justify-center'>
                            <div className='w-full lg:w-1/3'>
                                <Image src={dataBlank} className='mt-20' />
                            </div>
                        </div>
                        <div className='flex justify-center mt-2'>
                            <h4 className='text-muted font-bold'>Maaf! halaman sedang maintenance</h4>
                        </div>
                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}

export default NonPaket