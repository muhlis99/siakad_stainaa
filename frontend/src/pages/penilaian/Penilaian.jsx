import React, { useEffect } from 'react'
import ListPenilaian from '../../components/penilaian/ListPenilaian'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Penilaian = () => {
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
            <title>Penilaian Mahasiswa</title>
            <ListPenilaian />
        </Layout>
    )
}

export default Penilaian