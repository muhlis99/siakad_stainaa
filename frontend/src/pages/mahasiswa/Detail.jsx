import React, { useEffect } from 'react'
import Layout from "../Layout"
import DetailMhs from '../../components/mahasiswa/DetailMhs'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Detail = () => {
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
            <DetailMhs />
        </Layout>
    )
}

export default Detail