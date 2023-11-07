import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Row, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate, Link } from "react-router-dom"

const InputNilai = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { isError } = useSelector((state) => state.auth)

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Kartu Hasil Studi</h3>
                </div>
                <Row>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}

export default InputNilai