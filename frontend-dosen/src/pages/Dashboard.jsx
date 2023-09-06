import React, { useEffect } from 'react'
import Layout from './Layout'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import { Navigate } from "react-router-dom"

const Dashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const { isError, user } = useSelector((state) => state.auth)

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Dashboard</h3>
                </div>
                <Row>

                </Row>
            </div>}

        </Layout>
    )
}

export default Dashboard