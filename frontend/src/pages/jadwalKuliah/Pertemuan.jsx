import React, { useEffect } from 'react'
import Layout from '../Layout'
import SetPertemuan from '../../components/jadwalKuliah/SetPertemuan'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Pertemuan = () => {
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
            <title>Set Pertemuan Kuliah</title>
            <SetPertemuan />
        </Layout>
    )
}

export default Pertemuan