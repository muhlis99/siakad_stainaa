import React, { useEffect } from 'react'
import Layout from '../Layout'
import FormMhs2 from '../../components/mahasiswa/FormMhs2'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Form2 = () => {
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
            <FormMhs2 />
        </Layout>
    )
}

export default Form2