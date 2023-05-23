import React, { useEffect } from 'react'
import Layout from "../Layout"
import DetailDosen from '../../components/dosen/DetailDosen'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const DetailDsn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, isSuccess } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    if (isError) {
        return navigate("/login")
    }

    return (
        <Layout><DetailDosen /></Layout>
    )
}

export default DetailDsn