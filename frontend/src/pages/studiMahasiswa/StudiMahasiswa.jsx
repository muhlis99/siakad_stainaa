import React, { useEffect } from 'react'
import Layout from '../Layout'
import SetStudiMahasiswa from '../../components/studiMahasiswa/SetStudiMahasiswa'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const StudiMahasiswa = () => {
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
            <title>Studi Mahasiswa</title>
            <SetStudiMahasiswa />
        </Layout>
    )
}

export default StudiMahasiswa