import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormUpload from '../../components/mahasiswa/FormUpload'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Upload = () => {
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
            <FormUpload />
        </Layout>
    )
}

export default Upload