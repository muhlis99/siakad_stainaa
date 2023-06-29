import React, { useEffect } from 'react'
import FormAturJadwal from '../../components/jadwalKuliah/FormAturJadwal'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"


const AturJadwal = () => {
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
            <title>Atur Jadwal</title>
            <FormAturJadwal />
        </Layout>
    )
}

export default AturJadwal