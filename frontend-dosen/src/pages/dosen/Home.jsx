import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'


const Home = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            {isError ? <Navigate to="/login" replace /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Dashboard</h3>
                </div>


            </div>}
        </Layout>
    )
}

export default Home