import React, { useEffect } from 'react'
import Layout from '../Layout'
import FormEditRuang from '../../components/ruang/FormEditRuang'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const EditRuang = () => {
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
            <title>Edit Ruang</title><FormEditRuang />
        </Layout>
    )
}

export default EditRuang