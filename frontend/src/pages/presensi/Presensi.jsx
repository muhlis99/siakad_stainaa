import React, { useEffect } from 'react'
import Layout from "../Layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import MenuPresensi from '../../components/presensi/MenuPresensi'

const Presensi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            navigate("/login")
        }
    }, [isError, navigate])

    return (
        <Layout>
            <title>Presensi</title><MenuPresensi />
        </Layout>
    )
}

export default Presensi