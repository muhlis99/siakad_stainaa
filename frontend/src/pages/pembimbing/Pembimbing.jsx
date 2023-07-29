import React, { useEffect } from 'react'
import Layout from '../Layout'
import ListPembimbing from '../../components/pembimbing/ListPembimbing'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Pembimbing = () => {
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
            <title>Pembimbing Akademik</title>
            <ListPembimbing />
        </Layout>
    )
}

export default Pembimbing