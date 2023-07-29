import React, { useEffect } from 'react'
import Layout from '../Layout'
import FormEditPembimbing from '../../components/pembimbing/FormEditPembimbing'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const EditPembimbing = () => {
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
            <title>Edit Pembimbing AKademik</title>
            <FormEditPembimbing />
        </Layout>
    )
}

export default EditPembimbing