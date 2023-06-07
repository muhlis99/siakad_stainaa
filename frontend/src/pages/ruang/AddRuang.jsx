import React, { useEffect } from 'react'
import Layout from '../Layout'
import FormAddRuang from '../../components/ruang/FormAddRuang'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const AddRuang = () => {
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
            <FormAddRuang />
        </Layout>
    )
}

export default AddRuang