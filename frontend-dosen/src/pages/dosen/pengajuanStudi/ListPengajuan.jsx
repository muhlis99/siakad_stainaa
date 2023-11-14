import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'

const ListPengajuan = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <Layout>
            {isError ? <Navigate to="/login" replace />
                :
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">Pengajuan Studi</h3>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default ListPengajuan