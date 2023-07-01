import React, { useEffect } from 'react'
import Layout from '../Layout'
import DetailJadwal from '../../components/jadwalKuliah/DetailJadwal'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const DetailJadwalKuliah = () => {
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
            <title>Detail Jadwal Kuliah</title>
            <DetailJadwal />
        </Layout>
    )
}

export default DetailJadwalKuliah