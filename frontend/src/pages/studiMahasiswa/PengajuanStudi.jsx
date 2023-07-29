import React, { useEffect } from 'react'
import ListPengajuanStudi from '../../components/studiMahasiswa/ListPengajuanStudi'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const PengajuanStudi = () => {
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
            <title>Pengajuan Studi</title>
            <ListPengajuanStudi />
        </Layout>
    )
}

export default PengajuanStudi