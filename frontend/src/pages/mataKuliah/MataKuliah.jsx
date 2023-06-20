import React, { useEffect } from 'react'
import Layout from '../Layout'
import ListMataKuliah from '../../components/mataKuliah/ListMataKuliah'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"


const MataKuliah = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, isSuccess, message } = useSelector((state) => state.auth)

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
            <title>Mata Kuliah</title><ListMataKuliah />
        </Layout>
    )
}

export default MataKuliah