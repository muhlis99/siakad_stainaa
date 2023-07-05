import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import MhsPersemester from '../../components/mhsPersemester/MhsPersemester'

const Persemester = () => {
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
            <title>Set Mahasiswa Persemester</title>
            <MhsPersemester />
        </Layout>
    )
}

export default Persemester