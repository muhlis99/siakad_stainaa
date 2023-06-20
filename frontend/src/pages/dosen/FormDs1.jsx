import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormDosen1 from '../../components/dosen/FormDosen1'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const FormDs1 = () => {
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
            <FormDosen1 />
        </Layout>
    )
}

export default FormDs1