import React, { useEffect } from 'react'
import Layout from "../Layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import DataMhsAll from '../../components/pembayaranmhs/DataMhsAll'

const MhsAll = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    if (isError) {
        return navigate("/login")
    }

    return (
        <Layout>
            <title>Data Mahasiswa</title>
            <DataMhsAll />
        </Layout>
    )
}

export default MhsAll