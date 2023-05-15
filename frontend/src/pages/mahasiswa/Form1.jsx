import React, { useEffect } from 'react'
import FormMhs1 from '../../components/mahasiswa/FormMhs1'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Form1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    if (isError) {
        return navigate("/login")
    }

    return (
        <Layout>
            <FormMhs1 />
        </Layout>
    )
}

export default Form1