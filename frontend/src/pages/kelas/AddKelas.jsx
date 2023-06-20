import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormAddKelas from '../../components/kelas/FormAddKelas'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const AddKelas = () => {
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
            <title>Tambah Kelas</title>
            <FormAddKelas />
        </Layout>
    )
}

export default AddKelas