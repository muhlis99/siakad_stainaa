import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormMhs3 from '../../components/mahasiswa/FormMhs3'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Form3 = () => {
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
            <title>Form Mahasiswa</title><FormMhs3 />
        </Layout>
    )
}

export default Form3