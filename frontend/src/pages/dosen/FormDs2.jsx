import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormDosen2 from '../../components/dosen/FormDosen2'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const FormDs2 = () => {
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
            <FormDosen2 />
        </Layout>
    )
}

export default FormDs2