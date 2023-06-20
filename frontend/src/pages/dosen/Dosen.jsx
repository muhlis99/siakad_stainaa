import React, { useEffect } from 'react'
import Layout from "../Layout"
import ListDosen from '../../components/dosen/ListDosen'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Dosen = () => {
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
        <Layout>
            <title>Dosen</title>
            <ListDosen />
        </Layout>
    )
}

export default Dosen