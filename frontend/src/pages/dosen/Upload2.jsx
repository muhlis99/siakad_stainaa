import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormUpload2 from '../../components/dosen/FormUpload2'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Upload2 = () => {
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
            <title>Form Dosen</title>
            <FormUpload2 />
        </Layout>
    )
}

export default Upload2