import React, { useEffect } from 'react'
import Layout from '../Layout'
import ListStudiMahasiswa from '../../components/studiMahasiswa/ListStudiMahasiswa'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const ListStudiMhs = () => {
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
            <title>Studi Mahasiswa</title>
            <ListStudiMahasiswa />
        </Layout>
    )
}

export default ListStudiMhs