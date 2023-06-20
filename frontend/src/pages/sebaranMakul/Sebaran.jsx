import React, { useEffect } from 'react'
import Layout from '../Layout'
import ListSebaran from '../../components/sebaranMakul/ListSebaran'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const Sebaran = () => {
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
            <title>Sebaran Mata Kuliah</title>
            <ListSebaran />
        </Layout>
    )
}

export default Sebaran