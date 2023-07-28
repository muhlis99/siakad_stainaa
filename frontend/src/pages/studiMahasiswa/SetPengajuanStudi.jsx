import React, { useEffect } from 'react'
import Layout from '../Layout'
import SetPengajuan from '../../components/studiMahasiswa/SetPengajuan'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const SetPengajuanStudi = () => {
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
            <title>SetPengajuan Studi</title>
            <SetPengajuan />
        </Layout>
    )
}

export default SetPengajuanStudi