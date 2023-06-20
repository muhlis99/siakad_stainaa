import React, { useEffect } from 'react'
import Layout from "../Layout"
import ListRuang from '../../components/ruang/ListRuang'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Ruang = () => {
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
        <Layout><title>Ruang</title><ListRuang /></Layout>
    )
}

export default Ruang