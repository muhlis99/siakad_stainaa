import React, { useEffect } from 'react'
import Layout from '../Layout'
import DosenPengajar from '../../components/jadwalKuliah/DosenPengajar'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const DosenPgjr = () => {
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
            <title>Dosen Pengajar</title>
            <DosenPengajar />
        </Layout>
    )
}

export default DosenPgjr