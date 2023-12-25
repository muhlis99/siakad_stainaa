import React, { useEffect } from 'react'
import Layout from "../Layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import PedomanAdd from '../../components/pedoman/PedomanAdd'

const TambahPedoman = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, isSuccess } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    if (isError) {
        return navigate("/login")
    }

    return (
        <Layout>
            <title>Pedoman</title>
            <PedomanAdd />
        </Layout>
    )
}

export default TambahPedoman