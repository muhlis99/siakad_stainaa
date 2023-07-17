import React, { useEffect } from 'react'
import DetailMhsKelas from '../../components/kelas/DetailMhsKelas'
import Layout from "../Layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const DetailKelas = () => {
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
            <title>Detail Kelas</title>
            <DetailMhsKelas />
        </Layout>
    )
}

export default DetailKelas