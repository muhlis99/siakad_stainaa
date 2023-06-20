import React, { useEffect } from 'react'
import Layout from "../Layout"
import ListTahunAjaran from '../../components/tahunAjaran/ListTahunAjaran'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Tahun = () => {
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
        <Layout><title>Tahun Ajaran</title><ListTahunAjaran /></Layout>
    )
}

export default Tahun