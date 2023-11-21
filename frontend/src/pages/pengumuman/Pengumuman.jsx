import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import ListPengumuman from '../../components/pengumuman/ListPengumuman'

const Pengumuman = () => {
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
            <title>Pengumuman</title>
            <ListPengumuman />
        </Layout>
    )
}

export default Pengumuman