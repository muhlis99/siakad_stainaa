import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"

const Profil = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { isError, user } = useSelector((state) => state.auth)

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Profil</h3>
                </div>
                <Row>
                    <Col>
                        <Card className='shadow'>
                            <Card.Body>
                                <Row>
                                    <Col lg="3" className='bg-danger'>
                                        jajajaaj
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>}

        </Layout>
    )
}

export default Profil