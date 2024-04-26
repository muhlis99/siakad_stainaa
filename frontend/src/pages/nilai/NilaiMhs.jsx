import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import ListNilaiMhs from '../../components/nilai/ListNilaiMhs'

const NilaiMhs = () => {
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
            <title>Nilai Mahasiswa</title>
            <ListNilaiMhs />
        </Layout>
    )
}

export default NilaiMhs