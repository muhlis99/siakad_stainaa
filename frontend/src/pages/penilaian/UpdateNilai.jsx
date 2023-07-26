import React, { useEffect } from 'react'
import UpdateNilaiMhs from '../../components/penilaian/UpdateNilaiMhs'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"


const UpdateNilai = () => {
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
            <title>Update Nilai</title>
            <UpdateNilaiMhs />
        </Layout>
    )
}

export default UpdateNilai