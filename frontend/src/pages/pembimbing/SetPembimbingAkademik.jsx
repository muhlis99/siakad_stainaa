import React, { useEffect } from 'react'
import Layout from '../Layout'
import SetPembimbing from '../../components/pembimbing/SetPembimbing'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const SetPembimbingAkademik = () => {
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
            <title>Set Pembimbing Akademik</title>
            <SetPembimbing />
        </Layout>
    )
}

export default SetPembimbingAkademik