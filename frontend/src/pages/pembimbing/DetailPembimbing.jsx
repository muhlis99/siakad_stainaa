import React, { useEffect } from 'react'
import Layout from '../Layout'
import DetailPembimbingAkademik from '../../components/pembimbing/DetailPembimbingAkademik'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const DetailPembimbing = () => {
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
            <title>Detail Pembimbing Akademik</title>
            <DetailPembimbingAkademik />
        </Layout>
    )
}

export default DetailPembimbing