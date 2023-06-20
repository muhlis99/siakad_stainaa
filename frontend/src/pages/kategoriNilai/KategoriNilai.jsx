import React, { useEffect } from 'react'
import Layout from '../Layout'
import ListKategoriNilai from '../../components/kategoriNilai/ListKategoriNilai'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const KategoriNilai = () => {
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
            <title>Kategori Nilai</title>
            <ListKategoriNilai />
        </Layout>
    )
}

export default KategoriNilai