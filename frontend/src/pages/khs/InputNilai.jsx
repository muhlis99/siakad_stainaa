import React, { useEffect } from 'react'
import Layout from '../Layout'
import InputNilaiMhs from '../../components/khs/InputNilaiMhs'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const InputNilai = () => {
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
            <title>Input Nilai</title>
            <InputNilaiMhs />
        </Layout>
    )
}

export default InputNilai