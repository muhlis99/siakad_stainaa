import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"

const Berhenti = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { isError, user } = useSelector((state) => state.auth)

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header d-flex gap-2">
                    <h3 className="page-title">Riwayat Studi Mahasiswa</h3>
                </div>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}

export default Berhenti