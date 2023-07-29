import React, { useEffect } from 'react'
import Layout from '../Layout'
import SetMhsPerpembimbing from '../../components/pembimbing/SetMhsPerpembimbing'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Perpembimbing = () => {
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
            <title>Set Mahasiswa Perpembimbing</title>
            <SetMhsPerpembimbing />
        </Layout>
    )
}

export default Perpembimbing