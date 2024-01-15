import React, { useEffect } from 'react'
import Layout from "../Layout"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import PedomanList from '../../components/pedoman/PedomanList'

const Pedoman = () => {
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
            <title>Pedoman Akademik</title>
            <PedomanList />
        </Layout>
    )
}

export default Pedoman